/**
 * 表达式编辑器，用于条件和邮件模板
 * 邮件模板的formatValue需要额外加<var></var>
 */
import * as React from "react";
import {Component} from "react";
import * as rangy from "rangy";

export interface AkDesignerExprEditorProp extends IntlProps {
    value?: string; //受控参数
    defaultValue?: string;
    contentEditable?: boolean;
    formatValue?: (item: any) => string;
    formatDisplay?: (item: any) => string;
    onChange?: (value: string) => void;
    addFocus?: boolean;
    onTagTrigger?: (tagAddFunc) => void;
    style?: React.CSSProperties;
    multilines?: number; //显示编辑器行数
    singleLine?: boolean; //是否限制单行文本

}

interface AkDesignerExprEditorState {
    focus?: boolean;
}

class AkDesignerExprEditor extends Component < AkDesignerExprEditorProp,
    AkDesignerExprEditorState > {
    static defaultProps: AkDesignerExprEditorProp = {
        formatValue: (item) => item.value,
        formatDisplay: (item) => item.title,
        defaultValue: "",
    }

    constructor(props, context) {
        super(props, context);
    }

    private bookmark = null;

    private lastHtml = null;

    private totalLen = null;

    private editor: HTMLDivElement;

    private pasteEvent = false;

    triggerTag() {
        this.props.onTagTrigger(this.onTagAdd.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if ("value" in nextProps && nextProps.value !== this.editor.innerHTML) {
            this.editor.innerHTML = nextProps.value ? nextProps.value : "";
        }
    }

    shouldComponentUpdate(nextProps) {
        return !this.editor || (nextProps.value !== this.editor.innerHTML && nextProps.value !== this.props.value) || nextProps.contentEditable !== this.props.contentEditable;
    }

    emitChange() {
        let editor = this.editor;

        // #1 mark current range
        let sel = rangy.getSelection();
        let range = sel.rangeCount === 0 ? this.bookmark : sel.getRangeAt(0);
        this.bookmark = range ? range.cloneRange() : null;


        // #2 whether a change made
        let lastHtml = this.lastHtml;

        let currentHtml = editor.innerHTML;

        if (this.props.singleLine && this.pasteEvent) {
            currentHtml = this.removeLineBreaks(editor);
            this.pasteEvent = false;
        }

        if (lastHtml === currentHtml) {
            // no change made
            return
        }

        this.lastHtml = currentHtml;

        // // #3 trigger content change
        // let content = this.extractContents(editor);
        // //content = content.replace(/^\n/, '').replace(/\n$/, '').replace(/\n\n/g, '\n'); //format
        // if (content == '') { // clean extra <br/> in ios
        //     editor.innerHTML = '';
        // }

        this.props.onChange && this.props.onChange(currentHtml);

        // // #4 if type @
        // let lastLen = this.totalLen;
        // let len = content.length;
        // this.totalLen = len;
        // if (lastLen && len < lastLen) {
        //     // delete action
        //     return
        // }
        //
        // if (range && range.commonAncestorContainer.nodeType === Node.TEXT_NODE) {
        //     range.setStart(range.commonAncestorContainer, 0);
        //     let originStr = range.toString();
        //     if (originStr.substr(-1, 1) === '@') {
        //         // set range's start positions before choose contact
        //         range.setStart(range.commonAncestorContainer, originStr.length - 1);
        //         // save range positions
        //         this.bookmark = range.cloneRange();
        //         editor.blur();
        //         this.triggerTag();
        //     }
        // }

    }

    setCaretToEnd(editor) {
        editor = editor || this.editor;
        let selection = rangy.getSelection();
        let range = rangy.createRange();
        range.selectNodeContents(editor);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        return range
    }

    createTagNode(tags) {
        let t = this;
        let fragment = document.createDocumentFragment();
        tags = tags || [];
        tags.map((tag) => {
            let mentionNode = document.createElement('input');
            mentionNode.setAttribute('type', 'button');
            mentionNode.setAttribute('data', tag.value);
            //mentionNode.setAttribute('data', JSON.stringify(tag));
            mentionNode.setAttribute('tabindex', '-1');
            mentionNode.value = t.props.formatDisplay(tag);
            fragment.appendChild(mentionNode);
        });
        return fragment
    }

    public onTagAdd(tags) {
        if (!tags || tags.length === 0) {
            return
        }
        let t = this;
        let editor = this.editor;
        let selection = rangy.getSelection();
        let range = rangy.createRange();

        // go to positions to insert
        if (t.bookmark) {
            range = t.bookmark;
        } else {
            // else to move caret to the end & use this range
            range = this.setCaretToEnd(editor);
        }

        let tagNodes = t.createTagNode(tags);
        range.deleteContents(); // delete origin content in range like '@' or nothing
        let lastChild = tagNodes.lastChild; // before insert
        range.insertNode(tagNodes);

        // reset _bookmark after insert
        range.setStartAfter(lastChild);
        range.collapse(true);
        // do range select to focus
        selection.removeAllRanges();
        selection.addRange(range);
        t.bookmark = range.cloneRange();
        // give the option to focus
        // for mobile may not display keyboard after do range select to focus
        // fixme find another solution

        if (!t.props.addFocus) {
            editor.blur();
        }
        t.emitChange();
    }

    removeLineBreaks(editor) {
        editor = editor || this.editor;
        return this.removeLineBreaksByNodes(editor.childNodes);
    }

    removeLineBreaksByNodes(nodes) {
        let content = '';
        for (let i = 0, len = nodes.length; i < len; i += 1) {
            let node = nodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
                let tagName = node.tagName.toLowerCase();
                if (tagName === 'div') {
                    content += this.removeLineBreaksByNodes(node.childNodes);
                } else if (tagName === 'br') {
                    content += '';
                } else {
                    content += node.outerHTML;
                }
            } else if (node.nodeType === Node.TEXT_NODE) {
                content += node.textContent || node.nodeValue;
            }
        }
        return content;
    }

    //
    //
    // extractContents(editor) {
    //     editor = editor || this.editor;
    //     let t = this;
    //     let nodes = editor.childNodes;
    //     let content = '';
    //     if (nodes.length === 0) {
    //         return ''
    //     }
    //     for (let i = 0, len = nodes.length; i < len; i += 1) {
    //         let node = nodes[i];
    //         if (node.nodeType === Node.ELEMENT_NODE) {
    //             let tagName = node.tagName.toLowerCase();
    //             if (tagName === 'input') { // input element
    //                 let item = JSON.parse(node.getAttribute('data'));
    //                 content += t.props.formatValue(item);
    //             } else if (tagName === 'br') {
    //                 content += '\n';
    //             } else {
    //                 content += t.extractContents(node)
    //             }
    //         } else if (node.nodeType === Node.TEXT_NODE) {
    //             content += node.textContent || node.nodeValue;
    //         }
    //     }
    //     return content
    // }

    onFocus(e) {
        this.setState({focus: true});
    }

    onBlur(e) {
        let t = this;
        t.setState({focus: false});
    }

    onClick(e) {
        this.doMarkRange();
    }

    keydown(e) {
        //单行不允许输入回车
        if (this.props.singleLine && e.keyCode == 13) {
            e.preventDefault();
        }
    }

    onPasteCapture(e) {
        if (this.props.singleLine) {
            let data = e.clipboardData.getData('Text');
            if (data && data.trim().length > 0) {
                this.pasteEvent = true;
            }
        }
    }

    doMarkRange() {
        let t = this;
        let selection = rangy.getSelection();
        if (selection.rangeCount !== 0) {
            t.bookmark = selection.getRangeAt(0).cloneRange();
        }
    }

    createRef(obj) {
        this.editor = obj;
    }

    render() {
        const {multilines, value} = this.props;
        let height = 26 * multilines + 2;
        return <div className="ak-expr-editor-content ant-input"
                    style={Object.assign({}, this.props.style, {height:height})}
                    ref={this.createRef.bind(this)} contentEditable={this.props.contentEditable}
                    dangerouslySetInnerHTML={{__html:value}}
                    onInput={this.emitChange.bind(this)}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onClick={this.onClick.bind(this)}
                    onKeyDown={this.keydown.bind(this)}
                    onKeyUp={this.doMarkRange.bind(this)}
                    onPasteCapture={this.onPasteCapture.bind(this)}
                    onTouchEnd={this.doMarkRange.bind(this)}>
        </div>;
    }
}

export default AkDesignerExprEditor;
