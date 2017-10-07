import * as React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Button, ButtonGroup, Panel } from 'react-bootstrap'
import { DataListFiltered, DataListProps, DataItemProps, ConfirmButton, BatchLinkButton } from '../../layout'

type BatchUploadDataList = new () => DataListFiltered<CardPeak.Entities.BatchUpload>;
const BatchUploadDataList = DataListFiltered as BatchUploadDataList;

interface BatchUploadListProps {
    deletingBatch?: boolean;
    onDelete?: (id: number, deleteCompleted: () => void) => void;
}

interface BatchUploadListState {
    isDeleting?: boolean;
}

class BatchUploadRowLayout extends React.Component<DataItemProps<CardPeak.Entities.BatchUpload> & BatchUploadListProps, BatchUploadListState> {
    constructor(props: DataItemProps<CardPeak.Entities.BatchUpload> & BatchUploadListProps) {
        super(props);
        this.state = {
            isDeleting: undefined
        }
    }
    handleOnConfirm = () => {
        if (this.props.onDelete) {
            this.setState({ isDeleting: true });
            this.props.onDelete(this.props.item.batchId, () => {
                this.setState({ isDeleting: undefined });
            });
        }
    }
    render() {
        return (
            <Row>
                <Col mdHidden
                    lgHidden
                    smHidden
                    xsHidden={!this.props.isHeader}>
                    <span className="grid-label text-center spacer-left">Batch Uploads</span>
                </Col>
                <Col sm={1} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "id" : this.props.item.batchId}
                </Col>
                <Col sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "bank" : this.props.item.bank.description}
                </Col>
                <Col sm={3} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "file" : this.props.item.originalFileName}
                </Col>
                <Col sm={2} xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "rows" : this.props.item.processedRecords ? this.props.item.processedRecords : null}
                </Col>
                <Col sm={1} smHidden xsHidden={this.props.isHeader}>
                    {this.props.isHeader ? "completed" : null}
                    {!this.props.isHeader && this.props.item.hasErrors === true ? <span className="text-highlight text-danger">No</span> : null}
                    {!this.props.isHeader && this.props.item.hasErrors === false ? <span className="text-highlight text-success">Yes</span> : null}
                </Col>
                <Col md={2} sm={3} xsHidden={this.props.isHeader}>
                    {
                        this.props.isHeader ? "actions" :
                            <ButtonGroup>
                                <BatchLinkButton id={this.props.item.batchId} />
                                <ConfirmButton
                                    useButtonLoading
                                    noButtonLoadingText
                                    isLoading={this.state.isDeleting}
                                    disabled={this.props.deletingBatch}
                                    bsStyle="danger"
                                    buttonLabel={<i className="fa fa-trash-o"></i>}
                                    confirmTitle="Delete Batch"
                                    onConfirm={this.handleOnConfirm}>

                                    <p>
                                        You are about to
                                    <strong className="text-highlight text-danger"> delete </strong>
                                        batch: <span className="text-highlight">{this.props.item.batchId}</span>
                                    </p>
                                    <p className="text-right">Do you wish to continue?</p>
                                </ConfirmButton>
                            </ButtonGroup>
                    }
                </Col>
            </Row>
        )
    }
}

const BatchUploadList = (props: DataListProps<CardPeak.Entities.BatchUpload> & BatchUploadListProps) => {
    return (
        <div>
            <BatchUploadDataList
                predicate={(item, searchString) => {
                    const originalFileNameMatch = item.originalFileName.toLowerCase().indexOf(searchString) >= 0;
                    return originalFileNameMatch;
                }}
                pageSize={10}
                isLoading={props.isLoading}
                onGetKey={(item) => item.batchId}
                renderHeader={() => { return <BatchUploadRowLayout isHeader /> }}
                renderItem={(item, key) => { return <BatchUploadRowLayout {...(props as BatchUploadListProps)} item={item} key={key} /> }}
                data={props.data} />
        </div>
    )
}

export default BatchUploadList;