import * as _ from 'underscore';
interface RasterOptions {
    type?: string;
    width?: number;
    height?: number;
    backgroundColor?: string;
    quality?: number;
    padding?: number;
}
export class Raster {
    V : any;
    Paper : joint.dia.Paper;
    constructor(paper : joint.dia.Paper) {
        this.V = joint.V;
        this.Paper = paper;
    }
    toJPEG(options?: RasterOptions) {

        // options: width, height, backgroundColor, quality
        options = options || {};
        options.type = 'image/jpeg';
        return this.toDataURL(options);
    };

    toSVG(callback, opt) {
        opt = opt || {};

        // `viewportBbox` contains the real bounding box of the elements in the diagram,
        // 'whitespace trimmed'. Unfortunately, Firefox returns `x = 0` and `y = 0`
        // even though there is a whitespace between the left edge of the SVG and the
        // leftmost element. var viewportBbox = this.viewport.getBBox();

        var viewportTransform = this
            .V(this.Paper.viewport)
            .attr('transform');
        this
            .V(this.Paper.viewport)
            .attr('transform', '');

        var viewportBbox = this
            .Paper
            .getContentBBox();

        // We'll be modifying `style` and `transform` attribute of elements/nodes.
        // Therefore, we're making a deep clone of the whole SVG document.

        var svgClone = this
            .Paper
            .svg
            .cloneNode(true)as SVGElement;

        this
            .V(this.Paper.viewport)
            .attr('transform', viewportTransform || '');

        // We're removing css styles from the svg container. (i.e backround-image)
        svgClone.removeAttribute('style');

        // When all elements are shifted towards the origin (0,0), make the SVG
        // dimensions as small as the viewport. Note that those are set in the `viewBox`
        // attribute rather then in the `width`/`height` attributes. This allows for
        // fitting the svg element inside containers.
        if (opt.preserveDimensions) {

            this
                .V(svgClone)
                .attr({width: viewportBbox.width, height: viewportBbox.height});

        } else {
            this
                .V(svgClone)
                .attr({width: '100%', height: '100%'});
        }

        // Set SVG viewBox starting at top-leftmost element's position
        // (viewportBbox.x|y). We're doing this because we want to trim the `whitespace`
        // areas of the SVG making its size as small as necessary.
        this
            .V(svgClone)
            .attr('viewBox', viewportBbox.x + ' ' + viewportBbox.y + ' ' + viewportBbox.width + ' ' + viewportBbox.height);

        // Now the fun part. The code below has one purpuse and i.e. store all the CSS
        // declarations from external stylesheets to the `style` attribute of the SVG
        // document nodes. This is achieved in three steps.

        // 1. Disabling all the stylesheets in the page and therefore collecting only
        // default style values.    This, together with the step 2, makes it possible to
        // discard default CSS property values    and store only those that differ.
        // 2. Enabling back all the stylesheets in the page and collecting styles that
        // differ from the default values.
        // 3. Applying the difference between default values and the ones set by custom
        // stylesheets    onto the `style` attribute of each of the nodes in SVG. Note
        // that all of this would be much more simplified if
        // `window.getMatchedCSSRules()` worked in all the supported browsers. Pity is
        // that it doesn't even work in WebKit that has it
        // (https://bugzilla.mozilla.org/show_bug.cgi?id=438278). Pollyfil for Firefox
        // can be https://gist.github.com/ydaniv/3033012;

        var styleSheetsCount = document.styleSheets.length;
        var styleSheetsCopy = [];

        // 1.
        for (var i = styleSheetsCount - 1; i >= 0; i--) {

            // There is a bug (bugSS) in Chrome 14 and Safari. When you set
            // stylesheet.disable = true it will also remove it from document.styleSheets.
            // So we need to store all stylesheets before we disable them. Later on we put
            // them back to document.styleSheets if needed. See the bug
            // `https://code.google.com/p/chromium/issues/detail?id=88310`.
            styleSheetsCopy[i] = document.styleSheets[i];

            document.styleSheets[i].disabled = true;
        }

        var defaultComputedStyles = {};
        $(this.Paper.svg)
            .find('*')
            .each(function (idx, entry) {

                var computedStyle = window.getComputedStyle(entry, null);
                // We're making a deep copy of the `computedStyle` so that it's not affected by
                // that next step when all the stylesheets are re-enabled again.
                var defaultComputedStyle = {};
                _.each(computedStyle, function (property) {
                    defaultComputedStyle[property] = computedStyle.getPropertyValue(property);
                });

                defaultComputedStyles[idx] = defaultComputedStyle;
            });

        // bugSS: Check whether the stylesheets have been removed from
        // document.styleSheets
        if (styleSheetsCount != document.styleSheets.length) {
            // bugSS: Copy all stylesheets back
            _
                .each(styleSheetsCopy, function (copy, i) {
                    document.styleSheets[i] = copy;
                });
        }

        // 2. bugSS: Note that if stylesheet bug happen the document.styleSheets.length
        // is still 0.
        for (var i = 0; i < styleSheetsCount; i++) {
            document.styleSheets[i].disabled = false;
        }
        // bugSS: Now is document.styleSheets.length = number of stylesheets again.

        var customStyles = {};
        $(this.Paper.svg)
            .find('*')
            .each(function (idx, entry) {

                var computedStyle = window.getComputedStyle(entry, null);
                var defaultComputedStyle = defaultComputedStyles[idx];
                var customStyle = {};

                _.each(computedStyle, function (property) {

                    // Store only those that differ from the default styles applied by the browser.
                    // TODO: Problem will arise with browser specific properties (browser prefixed
                    // ones).
                    if (computedStyle.getPropertyValue(property) !== defaultComputedStyle[property]) {

                        customStyle[property] = computedStyle.getPropertyValue(property);
                    }
                });

                customStyles[idx] = customStyle;
            });

        var images = [];

        // 3.
        $(svgClone)
            .find('*')
            .each(function (idx, entry) {

                $(entry).css(customStyles[idx]);

                if (entry.tagName.toLowerCase() === 'image') {

                    images.push(entry);
                }
            });

        function serialize() {

            // Now, when our `svgClone` is ready, serialize it to a string and return it.
            return (new XMLSerializer()).serializeToString(svgClone)
            // fix for invalid XML entities (no-break spaces) in Safari
                .replace(/&nbsp;/g, '\u00A0');
        }

        if (opt.convertImagesToDataUris && images.length) {

            this
                .convertImages(function () {

                    callback(serialize());
                }, images);

        } else {

            return callback(serialize());
        }
    };

    convertImages(done, images) {

        var image = this.V(images.shift());
        if (!image)
            return done();
        let topThis = this;
        // Firefox uses `href`, all the others 'xlink:href'
        var url = image.attr('xlink:href') || image.attr('href');

        joint
            .util
            .imageToDataUri(url, function (err, dataUri) {
                image.attr('xlink:href', dataUri);
                topThis.convertImages(done, images);
            });
    }
    toDataURL(options : RasterOptions):Promise<string> {
        return new Promise((resolve, reject)=>{
        let topThis = this;
        // check whether the svg export plugin was loaded.
        if (typeof this.toSVG !== 'function')
            throw new Error('The joint.format.svg.js plugin must be loaded.');

        // options: type, width, height, quality (works only with type set to
        // 'image/jpeg' or 'image/webp'), backgroundColor
        options = options || {};

        var imageWidth,
            imageHeight,
            contentHeight,
            contentWidth;
        var padding = joint
            .util
            .normalizeSides(options.padding)as BoxPadding;

        if (!options.width || !options.height) {

            // The raster size wasn't defined. We get the size of the bounding client rect
            // of the viewport instead.
            var clientRect = this
                .Paper
                .getContentBBox();

            // the dimensions of the image content (without padding)
            contentWidth = clientRect.width || 1;
            contentHeight = clientRect.height || 1;

            // the dimensions of the output image
            imageWidth = contentWidth + padding.left + padding.right;
            imageHeight = contentHeight + padding.top + padding.bottom;

        } else {

            imageWidth = options.width;
            imageHeight = options.height;

            // The content has to be at least 1px wide.
            if (padding.left + padding.right >= imageWidth) {
                padding.left = padding.right = 0;
            };

            // The content has to be at least 1px high.
            if (padding.top + padding.bottom >= imageHeight) {
                padding.top = padding.bottom = 0;
            }

            contentWidth = imageWidth - padding.left - padding.right;
            contentHeight = imageHeight - padding.top - padding.bottom;
        }

        var img = new Image();
        var svg;

        // Drawing an image into the canvas has to be done after the image was
        // completely loaded.
        img.onload = function () {

            var dataURL,
                context,
                canvas;

            // Helper to create a new canvas.
            function createCanvas() {

                canvas = document.createElement('canvas');
                canvas.width = imageWidth;
                canvas.height = imageHeight;

                // Draw rectangle of a certain color covering the whole canvas area. A JPEG
                // image has black background by default and it might not be desirable.
                context = canvas.getContext('2d');
                context.fillStyle = options.backgroundColor || 'white';
                context.fillRect(0, 0, imageWidth, imageHeight);
            };

            // Helper to read the canvas
            function readCanvas() {

                // Try to read the content of our canvas.
                dataURL = canvas.toDataURL(options.type, options.quality);
                // Return dataURL in the given callback.

                if (canvas.svg && _.isFunction(canvas.svg.stop)) {
                    // Clear the interval that is set up by the Canvg lib.
                    _.defer(canvas.svg.stop);
                }

                resolve(dataURL);
            }

            createCanvas();

            // Drawing SVG images can taint our canvas in some browsers. That means we won't
            // be able to read canvas back as it would fail with `Error: SecurityError: DOM
            // Exception 18`. See
            // `http://getcontext.net/read/chrome-securityerror-dom-exception-18`.
            context.drawImage(img, padding.left, padding.top, contentWidth, contentHeight);

            readCanvas();

        };

        this.toSVG(function (svgString) {

            // A canvas doesn't like width and height to be defined as percentage for some
            // reason. We need to replace it with desired width and height instead.
            svg = svgString = svgString
                .replace('width="100%"', 'width="' + contentWidth + '"')
                .replace('height="100%"', 'height="' + contentHeight + '"');

            // An image starts loading when we assign its source. img.src =
            // 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(svgString)); img.src =
            // 'data:image/svg+xml;base64,' + btoa(svgString);
            img.src = 'data:image/svg+xml,' + encodeURIComponent(svgString);

        }, {convertImagesToDataUris: true});
        });

    };
    replaceSVGImagesWithSVGEmbedded(svg) {

        return svg.replace(/\<image[^>]*>/g, function (imageTag) {

            var href = imageTag.match(/href="([^"]*)"/)[1];
            var svgDataUriPrefix = 'data:image/svg+xml';

            if (href.substr(0, svgDataUriPrefix.length) === svgDataUriPrefix) {
                var svg = decodeURIComponent(href.substr(href.indexOf(',') + 1));
                // Strip the <?xml ...?> header if there is one.
                return svg.substr(svg.indexOf('<svg'));
            }

            return imageTag;
        });
    }
}
