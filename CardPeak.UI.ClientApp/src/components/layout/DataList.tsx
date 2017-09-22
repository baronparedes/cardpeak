import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock } from './'

export interface DataListProps<T> {
    data: T[];
    rowLayout: any;
    addOn?: React.ReactNode;
    onGetKey?: (item: T) => number;
}

export interface DataItemProps<T> {
    item?: T;
    isHeader?: boolean;
}

function dataRowLayout<T>(DataRowLayout: any, props: DataItemProps<T>) {
    return class extends React.Component {
        constructor(props: DataItemProps<T>) {
            super(props);
        }
        render() {
            return (
                <DataRowLayout {...props} />
            )
        }
    }
}

export class DataList<T> extends React.Component<DataListProps<T>>{
    constructor(props: DataListProps<T>) {
        super(props);
    }
    render() {
        let key: number = 0;
        const HeaderDataRowLayout = dataRowLayout<T>(this.props.rowLayout, { isHeader: true });
        return (
            <div>
                {this.props.addOn}
                <GridList header={<HeaderDataRowLayout />}>
                    {
                        this.props.data && this.props.data.length > 0 ?
                            this.props.data.map((item) => {
                                key = this.props.onGetKey ? this.props.onGetKey(item) : key + 1;
                                const DataRowLayout = dataRowLayout<T>(this.props.rowLayout, { isHeader: false, item: item }); 
                                return (
                                    <Panel className="panel-row" key={key}>
                                        <DataRowLayout />
                                    </Panel>
                                )
                            }) : <ListNoRecordsRow />
                    }
                </GridList>
            </div>
        )
    }
}