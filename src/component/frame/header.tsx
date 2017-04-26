import * as React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router';
import {FormattedMessage} from 'react-intl';

interface AkmiiHeaderProps {}
interface AkmiiHeaderStates {}

export class AkmiiHeader extends Component < AkmiiHeaderProps,
AkmiiHeaderStates > {
    render() {
        return <div style={AkmiiHeaderStyle.Header}>
            {this.props.children}
        </div>
    }
}
class AkmiiHeaderStyle {
    static Header : React.CSSProperties = {
        background: "#fafafa",
        lineHeight: "50px",
        fontFamily: '"Segoe UI","Lucida Grande",Helvetica,Arial,"Microsoft YaHei",FreeSans,Arimo,"Dro' +
                'id Sans","wenquanyi micro hei","Hiragino Sans GB","Hiragino Sans GB W3",FontAwes' +
                'ome,sans-serif!important',
        color: "#000",
        fontSize: 16,
        height: 50,
    }
}
