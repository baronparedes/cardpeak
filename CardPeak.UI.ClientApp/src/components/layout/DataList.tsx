import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock } from './'

export interface DataListDisplayProps<T> {
    renderItem: (item: T, key: number | string) => React.ReactNode;
    renderHeader: () => React.ReactNode;
    addOn?: React.ReactNode;
}

export interface DataListProps<T> {
    data: T[];
    onGetKey?: (item: T) => number | string;
    isLoading?: boolean;
}

export interface DataItemProps<T> {
    item?: T;
    isHeader?: boolean;
}

export class DataList<T> extends React.Component<DataListProps<T> & DataListDisplayProps<T>>{
    constructor(props: DataListProps<T> & DataListDisplayProps<T>) {
        super(props);
    }
    render() {
        let row: number = 0;
        return (
            <div>
                {this.props.addOn}
                <GridList header={this.props.renderHeader()}>
                    {
                        this.props.isLoading ? <SpinnerBlock /> :
                            this.props.data && this.props.data.length > 0 ?
                                this.props.data.map((item) => {
                                    row++;
                                    const key = this.props.onGetKey ? this.props.onGetKey(item) : row;
                                    return (
                                        <Panel className="panel-row" key={key}>
                                            {this.props.renderItem(item, key)}
                                        </Panel>
                                    )
                                }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        )
    }
}