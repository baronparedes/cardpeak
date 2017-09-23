import * as React from 'react'
import * as concat from 'classnames'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import { DataList, DataListProps, DataItemProps, ModalPanel } from '../../layout'
import { dateFormat } from '../../../helpers/dateHelpers'
import { Currency } from '../../layout'

type BatchUploadErrorDataList = new () => DataList<CardPeak.Entities.ProcessedApprovalTransaction>;
const BatchUploadErrorDataList = DataList as BatchUploadErrorDataList;

interface BatchUploadErrorDetailRowLayoutState {
    showModal?: boolean;
}

class BatchUploadErrorRowLayout extends React.Component<DataItemProps<CardPeak.Entities.ProcessedApprovalTransaction>, BatchUploadErrorDetailRowLayoutState> {
    constructor(props: DataItemProps<CardPeak.Entities.ProcessedApprovalTransaction>) {
        super(props);
        this.state = {
            showModal: undefined
        }
    }
    handleOnToggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    }
    renderShowErrorButton() {
        let key: number = 0;
        if (this.props.isHeader) {
            return null;
        }
        return (
            <div>
                <Button bsStyle="danger" bsSize="sm" onClick={this.handleOnToggleModal}>
                    <i className="fa fa-lg fa-exclamation-circle"></i>
                </Button>
                <ModalPanel title={"Errors found on row # " + this.props.item.row} onToggleModal={this.handleOnToggleModal} showModal={this.state.showModal}>
                    {this.props.item.errorMessages.map(error => {
                        key++;
                        return (<div key={this.props.item.row + "." + key}>{error}</div>);
                    })}
                </ModalPanel>
            </div>
        )
    }
    render() {
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!this.props.isHeader}>
                    <span className="grid-label text-center spacer-left">Processed Transactions</span>
                </Col>
                <Col lg={1} md={1} sm={1} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "row" : this.props.item.row}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "card category" : this.props.item.approvalTransaction.cardCategory.description}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "product" : this.props.item.approvalTransaction.productType}
                </Col>
                <Col lg={4} md={4} sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "client" : this.props.item.approvalTransaction.client}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "alias" : this.props.item.alias}
                </Col>
                <Col lg={1} md={1} sm={2} xsHidden={this.props.isHeader}>
                    {this.renderShowErrorButton()}
                </Col>
            </Row>
        )
    }
}


const BatchUploadErrorList = (props: DataListProps<CardPeak.Entities.ProcessedApprovalTransaction>) => {
    return (
        <div>
            <BatchUploadErrorDataList
                isLoading={props.isLoading}
                renderHeader={() => { return <BatchUploadErrorRowLayout isHeader /> }}
                renderItem={(item, key) => { return <BatchUploadErrorRowLayout item={item} key={key} /> }}
                data={props.data} />
        </div>
    )
}

export default BatchUploadErrorList