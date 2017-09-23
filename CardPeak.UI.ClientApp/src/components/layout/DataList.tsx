import * as React from 'react'
import { Row, Col, Button, Panel } from 'react-bootstrap'
import { ListNoRecordsRow, GridList, SpinnerBlock, InjectProps } from './'

export interface DataListProps<T> {
    data: T[];
    rowLayout: any;
    addOn?: React.ReactNode;
    onGetKey?: (item: T) => number | string;
    isLoading?: boolean;
}

export interface DataItemProps<T> {
    item?: T;
    isHeader?: boolean;
}

export class DataList<T> extends React.Component<DataListProps<T>>{
    constructor(props: DataListProps<T>) {
        super(props);
    }
    render() {
        let row: number = 0;
        const HeaderDataRowLayout = InjectProps<DataItemProps<T>>(this.props.rowLayout, { isHeader: true });
        return (
            <div>
                {this.props.addOn}
                <GridList header={<HeaderDataRowLayout />}>
                    {
                        this.props.isLoading ? <SpinnerBlock /> :
                            this.props.data && this.props.data.length > 0 ?
                                this.props.data.map((item) => {
                                    const key = this.props.onGetKey ? this.props.onGetKey(item) : (row + 1);
                                    const newProps: DataItemProps<T> = {
                                        isHeader: false,
                                        item: item
                                    }
                                    const DataRowLayout = InjectProps<DataItemProps<T>>(this.props.rowLayout, newProps);
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