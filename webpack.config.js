var webpack = require('webpack');
var path = require('path');
var config = require('./bin/config/index');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 项目根路径
var ROOT_PATH = path.resolve(__dirname);
// 项目源码路径
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
// 产出路径
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

// 从配置文件获取env or  直接从环境获取
var env = 'development';
// const __DEV__ = config.env === 'development';
var is_dev = process.env.NODE_ENV === 'development';
var target = 'https://uatyeeofficeworkflowcenter.yeeoffice.com/flowcraft/_api/ver(3.0)/';
var proxy = {};
if (is_dev) {
    proxy = {
        "/api/*": {
            changeOrigin: true,
            target: target,
            // target: 'http://114.55.86.252:8080/mockjs/1/',
            // target: 'http://192.168.3.82:8090/',
            // target: 'http://192.168.0.55/',
            secure: false
        },
        "/common/api/*": {
            target: target,
            // target: 'http://114.55.86.252:8080/mockjs/1/',
            // target: 'http://192.168.3.82:8090/',
            // target: 'http://192.168.0.55/',
            secure: false
        },
        '/**': {
            target: '/index.html',
            secure: false,
            bypass: function(req, res, proxyOptions) {
                if (req.path == '/config') {
                    return res.json(config().runtime)
                }
                return '/'
            }
        }
    }
}

module.exports = {
    entry: {
        commons: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'redux-thunk',
            'jquery',
            'jointjs'
        ],
        app: ['./src/app']
    },
    output: {
        path: is_dev ?
            "/" : BUILD_PATH,
        publicPath: is_dev ?
            '/' : '/dist/',
        filename: is_dev ?
            '[name].js' : '[name].js',
        chunkFilename: is_dev ?
            '[name]-[hash:5].js' : '[name]-[hash:5].js'
    },
    devServer: {
        proxy: proxy
    },
    module: {
        loaders: [{
            test: /\.tsx|\.ts$/,
            exclude: /^node_modules$/,
            loader: 'ts-loader'
        }, {
            test: /\.(less|css)$/,
            exclude: /^node_modules$/,
            loader: ExtractTextPlugin.extract('style-loader', "css-loader?minimize!less-loader?compress")
        }, {
            test: /\.json$/,
            loader: 'json-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: 'url?limit=10000&name=img/[hash].[ext]'
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({ "$": "jquery", "joint": "jointjs" }),
        new ExtractTextPlugin('app.css'),
        new HtmlWebpackPlugin({
            favicon: './favicon.ico', //favicon路径
            filename: '../index.html',
            template: "./src/index.html",
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new webpack
        .optimize
        .CommonsChunkPlugin('commons', 'commons.js'),
        new webpack.NoErrorsPlugin(), //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack
        .optimize
        .OccurenceOrderPlugin() //排序输出
    ],
    resolve: {
        root: path.resolve(__dirname),
        src: path.resolve(__dirname, 'src'),
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    }
}