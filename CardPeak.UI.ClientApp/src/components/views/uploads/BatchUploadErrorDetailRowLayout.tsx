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
        if (this.props.isHeader) {
            return null;
        }
        return (
            <div>
                <Button bsStyle="warning" bsSize="sm" onClick={this.handleOnToggleModal}>errors</Button>
                <ModalPanel title="Errors" onToggleModal={this.handleOnToggleModal} showModal={this.state.showModal}>
                    {this.props.processedItem.errorMessages}
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
                    <span className="text-center spacer-left">Processed Transactions</span>
                </Col>
                <Col lg={1} md={1} sm={1} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "row" : this.props.processedItem.row}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "card category" : this.props.processedItem.transaction.cardCategory.description}
                </Col>
                <Col lg={2} md={2} sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "product" : this.props.processedItem.transaction.productType}
                </Col>
                <Col lg={4} md={4} sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "client" : this.props.processedItem.transaction.client}
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