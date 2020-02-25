import * as React from 'react';
import { Pagination, Panel } from 'react-bootstrap';
import { GridList, ListNoRecordsRow, SpinnerBlock } from './';

export interface DataListDisplayProps<T> {
    renderItem: (item: T, key: number | string) => React.ReactNode;
    renderHeader: () => React.ReactNode;
    addOn?: React.ReactNode;
}

export interface DataListProps<T> {
    data: T[];
    onGetKey?: (item: T) => number | string;
    isLoading?: boolean;
    pageSize?: number;
}

export interface DataItemProps<T> {
    item?: T;
    isHeader?: boolean;
}

export interface DataListState<T> {
    data?: T[];
    pageSize?: number;
    pages?: number;
    currentPage?: number;
    defaultPageSize?: number;
}

export class DataList<T> extends React.Component<
    DataListProps<T> & DataListDisplayProps<T>,
    DataListState<T>
> {
    constructor(props: DataListProps<T> & DataListDisplayProps<T>) {
        super(props);
        if (props.pageSize) {
            this.state = {
                data: props.data
                    ? props.data.slice(0, props.pageSize)
                    : props.data,
                pageSize: props.pageSize,
                pages: !props.data
                    ? 0
                    : Math.ceil(props.data.length / props.pageSize),
                currentPage: 1
            };
        } else {
            this.state = {
                data: props.data
            };
        }
    }
    handleOnSelectPage = (page: any) => {
        if (!this.state.pageSize) {
            return;
        }
        if (this.props.data) {
            const startIndex = (page - 1) * this.state.pageSize;
            const endIndex = startIndex + this.state.pageSize;
            const pagedData = this.props.data.slice(
                startIndex,
                endIndex
            );
            this.setState({
                data: pagedData,
                currentPage: page
            });
        }
    };
    componentWillReceiveProps(
        nextProps: DataListProps<T> & DataListDisplayProps<T>
    ) {
        if (this.props.data != nextProps.data) {
            if (nextProps.pageSize) {
                this.setState({
                    data: nextProps.data.slice(0, nextProps.pageSize),
                    pageSize: nextProps.pageSize
                        ? nextProps.pageSize
                        : this.state.defaultPageSize,
                    pages: !nextProps.data
                        ? 0
                        : Math.ceil(
                              nextProps.data.length /
                                  (nextProps.pageSize
                                      ? nextProps.pageSize
                                      : this.state.defaultPageSize)
                          ),
                    currentPage: 1
                });
            } else {
                this.setState({ data: nextProps.data });
            }
        }
    }
    render() {
        let row: number = 0;
        return (
            <div>
                {this.props.addOn}
                <GridList header={this.props.renderHeader()}>
                    {this.props.isLoading ? (
                        <SpinnerBlock />
                    ) : this.state.data &&
                      this.state.data.length > 0 ? (
                        this.state.data.map(item => {
                            row++;
                            const key = this.props.onGetKey
                                ? this.props.onGetKey(item)
                                : row;
                            return (
                                <Panel className="panel-row" key={key}>
                                    {this.props.renderItem(item, key)}
                                </Panel>
                            );
                        })
                    ) : (
                        <ListNoRecordsRow />
                    )}
                </GridList>
                {!this.props.pageSize ? null : (
                    <div className="container-fluid text-center">
                        <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.state.pages}
                            maxButtons={3}
                            activePage={this.state.currentPage}
                            onSelect={this.handleOnSelectPage}
                        />
                    </div>
                )}
            </div>
        );
    }
}
