import * as React from "react";
import * as classNames from "classnames";
import * as Lazyload from "react-lazy-load";
import {AkCheckbox} from "./ak-checkbox";

function isRenderResultPlainObject(result) {
    return result && !React.isValidElement(result) &&
        Object.prototype.toString.call(result) === '[object Object]';
}

export class AkListItem extends React.Component<any, any> {

    matchFilter = (text) => {
        const {filter, filterOption, item} = this.props;
        if (filterOption) {
            return filterOption(filter, item);
        }
        return text.indexOf(filter) >= 0;
    }

    render() {
        const {render, filter, item, lazy, checked, prefixCls, onClick} = this.props;
        const renderResult = render(item);

        let renderedText;
        let renderedEl;
        if (isRenderResultPlainObject(renderResult)) {
            renderedText = renderResult.value;
            renderedEl = renderResult.label;
        } else {
            renderedText = renderResult;
            renderedEl = renderResult;
        }

        if (filter && filter.trim() && !this.matchFilter(renderedText)) {
            return null;
        }

        const className = classNames({
            [`${prefixCls}-content-item`]: true,
            [`${prefixCls}-content-item-disabled`]: item.disabled,
        });

        const listItem = (
            <li
                className={className}
                title={renderedText}
                onClick={item.disabled ? undefined : () => onClick(item)}
            >
                <AkCheckbox checked={checked} disabled={item.disabled}/>
                <span>{renderedEl}</span>
            </li>
        );
        let children: JSX.Element | null = null;
        if (lazy) {
            const lazyProps = Object.assign({
                height: 32,
                offset: 500,
                throttle: 0,
                debounce: false,
            }, lazy);
            children = <Lazyload {...lazyProps}>{listItem}</Lazyload>;
        } else {
            children = listItem;
        }

        return children;
    }
}
