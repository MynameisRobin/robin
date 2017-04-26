import * as React from 'react'
import {Component} from 'react'
import {withRouter} from 'react-router';
import {injectIntl} from 'react-intl';
import AkDesigner from '../../component/designer/ak-designer';
import {ProcModelAPI} from '../../api/procmodel';
import {AkMessage} from '../../component/controls/ak-message';
import {AkNotification} from '../../component/controls/ak-notification';

interface ProcModelDesignerPageProps extends IntlProps,
RouterProps {}
interface ProcModelDesignerPageStates {
    /**当前Model信息 */
    modelInfo?: ProcessInfo;
    /**数据信息 */
    processData?: ProcessProperties;
}
class ProcModelDesignerPage extends Component < ProcModelDesignerPageProps,
ProcModelDesignerPageStates > {

    modelItemRequest?: GetProcModelByIDRequest;
    depRequest?: DeployProcModelRequest; //发布
    defRequest?: PutProcModelDefRequest;
    constructor(props, context) {
        super(props, context);
        const {location} = this.props;
        this.modelItemRequest = {
            procModelID: location.query["id"]
        }
        this.defRequest = {
            ProcModelID: location.query["id"]
        };
        this.depRequest = {
            ProcModelID: location.query["id"]
        }
        this.state = {
            modelInfo: {}
        }
    }
    componentDidMount() {
        this.loadData();
    }
    /**
     * 加载数据
     *
     * @memberOf ProcModelDesignerPage
     */
    loadData() {
        ProcModelAPI
            .getProcModelByID(this.modelItemRequest)
            .then(data => {
                if (data.Status == "0" && data.Data) {
                    let defData = data.Data.DefBlob
                        ? JSON.parse(data.Data.DefBlob)
                        : null;
                    this.setState({modelInfo: data.Data, processData: defData});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            });
    }
    saveDef(defData,img) {
        this.defRequest = {
            ImgBlob:img,
            DefBlob: JSON.stringify(defData),
            DefResourceID: this.props.location.query["rid"],
            ProcModelID: this.props.location.query["id"],
            Name: this.state.modelInfo.Name
        }
        ProcModelAPI
            .putProcModelDef(this.defRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            })
    }
    deployDef(defData) {
        this.depRequest.ProcModelID = this.props.location.query["id"]
        ProcModelAPI
            .deployProcModel(this.depRequest)
            .then(data => {
                if (data.Status == "0") {
                    AkNotification.success({message: '提示', description: data.Message});
                } else {
                    // AkMessage.warning(data.Message);
                    AkNotification.warning({message: '提示', description: data.Message});
                }
            })
    }
    render() {
        return <AkDesigner
            Data={this.state.processData}
            onDeploy={(defData) => {
            this.deployDef(defData);
        }}
            onSave={(defData,img) => this.saveDef(defData,img)}></AkDesigner>
    }
}
class ProcModelDesignerPageStyle {}
export default withRouter(injectIntl(ProcModelDesignerPage))
