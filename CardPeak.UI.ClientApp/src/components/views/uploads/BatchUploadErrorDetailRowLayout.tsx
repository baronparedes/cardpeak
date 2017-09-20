import * as React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { ModalPanel } from '../../layout'

interface BatchUploadErrorDetailRowLayoutProps {
    processedItem?: CardPeak.Entities.ProcessedApprovalTransaction,
    isHeader: boolean
}

interface BatchUploadErrorDetailRowLayoutState {
    showModal?: boolean;
}

class BatchUploadErrorDetailRowLayout extends React.Component<BatchUploadErrorDetailRowLayoutProps, BatchUploadErrorDetailRowLayoutState> {
    constructor(props: BatchUploadErrorDetailRowLayoutProps) {
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
                <ModalPanel title={"Errors found on row # " + this.props.processedItem.row} onToggleModal={this.handleOnToggleModal} showModal={this.state.showModal}>
                    {this.props.processedItem.errorMessages.map(error => {
                        key++;
                        return (<div key={this.props.processedItem.row + "." + key}>{error}</div>);
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
                    {this.props.isHeader ? "row" : this.props.processedItem.row}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "card category" : this.props.processedItem.approvalTransaction.cardCategory.description}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "product" : this.props.processedItem.approvalTransaction.productType}
                </Col>
                <Col lg={4} md={4} sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "client" : this.props.processedItem.approvalTransaction.client}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "alias" : this.props.processedItem.alias}
                </Col>
                <Col lg={1} md={1} sm={2} xsHidden={this.props.isHeader}>
                    {this.renderShowErrorButton()}
                </Col>
            </Row>
        )
    }
}

export default BatchUploadErrorDetailRowLayout;