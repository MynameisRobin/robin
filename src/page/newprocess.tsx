import * as React from 'react'
import {Component} from 'react'
import {withRouter, Link} from 'react-router';
import {injectIntl, FormattedMessage} from 'react-intl';
import {NavLocale, NewProcessPageLocale} from '../locales/localeid';
import {CategoryAPI} from '../api/category';
import {ProcDefsAPI} from '../api/procdefs';
import {AkIcon} from '../component/controls/ak-icon';
import {AkRow} from '../component/controls/ak-row';
import {AkCol} from '../component/controls/ak-col';
import {AkSelect} from '../component/controls/ak-select';
import {AkInput} from '../component/controls/ak-input';
import {AkCard} from '../component/controls/ak-card';
import {MainContent} from './components/maincontent';
import {PathConfig} from '../config/pathconfig';

interface NewProcessProps extends IntlProps,
ReactRouter.RouteComponentProps < void,
void > {}
interface NewProcessStates {
    processData?: ProcessInfo[];
    categoryData?: CategoryInfo[];
    loading?: boolean;
    applicationRequest?: GetAllApplicationsRequest;
}
/** 新建流程 */
class NewProcess extends Component < NewProcessProps,
NewProcessStates > {
    constructor(props, context) {
        super(props, context);
        this.state = {
            applicationRequest: {}
        }
    }

    componentDidMount() {
        this.setState({loading: true})
        this.loadCategory();
        this.loadData();
    }
    /**加载流程分类数据 */
    loadCategory() {
        CategoryAPI
            .getCategory()
            .then(data => {
                this.setState({categoryData: data.Data})
            });
    }
    /**
     * 获取用户持有的流程定义
     */
    loadData() {
        ProcDefsAPI
            .getAllApplication(this.state.applicationRequest)
            .then(data => {
                this.setState({loading: false, processData: data.Data})
            });
    }
    /**选择分类 */
    selectChange(value) {
        this.state.applicationRequest.categoryID = value;
    }
    /**流程名称 */
    inputChange(value) {
        this.state.applicationRequest.flowName = value;
    }

    /**头部右上角 Search 部分 */
    renderHeaderSearch(categoryData) {
        let topThis = this;
        let format = topThis.props.intl.formatMessage;

        let select = <AkSelect defaultValue="">
            <AkSelect.Option value="">
                <FormattedMessage id={NewProcessPageLocale.ChoseCategory}></FormattedMessage>
            </AkSelect.Option>
        </AkSelect>;

        if (categoryData !== null && categoryData !== undefined) {
            select = <AkSelect
                onChange={topThis
                .selectChange
                .bind(topThis)}
                defaultValue={format({id: NewProcessPageLocale.ChoseCategory})}>
                {categoryData
                    .map(function (entry, index) {
                        return <AkSelect.Option value={entry.CategoryID} key={index}>{entry.Name}</AkSelect.Option>
                    })}
            </AkSelect>;
        }

        return <AkRow align="middle" type="flex" justify="space-around" className="row-w150">
            <AkCol>{select}</AkCol>
            <AkCol>
                <AkInput
                    allowClear={true}
                    onChange={topThis
                    .inputChange
                    .bind(topThis)}
                    placeholder={format({id: NewProcessPageLocale.InputProcessName})}></AkInput>
            </AkCol>
            <AkCol>
                <AkIcon
                    type="search"
                    style={{
                    width: '40px'
                }}
                    onClick={() => {
                    topThis.loadData()
                }}></AkIcon>
            </AkCol>
        </AkRow>
    }

    render() {
        let topThis = this;
        let categoryData = topThis.state.categoryData;
        let contentData = topThis.state.processData;
        let content = null;

        if (contentData !== null && contentData !== undefined) {
            content = <AkRow align="middle" type="flex" justify="start">
                {contentData
                    .map(function (entry, index) {
                        return <AkCol xs={12} sm={8} md={6} lg={3} key={index}>
                            <AkCard>
                                <span
                                    onClick={() => {
                                    window.openWithHash(PathConfig.ApplyProcess + "?key=" + entry.Key+"&id="+entry.ID)
                                }}>
                                    {/**GO TO 表单 */}
                                    {/*<span href={entry.FormURL} target="_blank">*/}
                                    <img src={entry.IconURL}/>
                                    <p/> {entry.Name}
                                </span>
                            </AkCard>
                        </AkCol>
                    })
}
            </AkRow>
        }

        return <MainContent
            Header={NewProcessPageLocale.HeaderTitle}
            Search={topThis.renderHeaderSearch(categoryData)}>
            {content}
        </MainContent>
    }
}
class NewProcessStyle {}

export default injectIntl(withRouter(NewProcess))
