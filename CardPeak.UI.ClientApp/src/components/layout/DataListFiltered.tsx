import * as React from 'react'
import { DataList, DataListProps, SearchBar } from './'

interface DataListFilteredProps<T> {
    predicate: (item: T, searchString: string) => any;
}

interface DataListFilteredState<T> {
    filteredData?: T[];
}

export class DataListFiltered<T> extends React.Component<DataListProps<T> & DataListFilteredProps<T>, DataListFilteredState<T>> {
    constructor(props: DataListProps<T> & DataListFilteredProps<T>) {
        super(props);
        this.state = {
            filteredData: props.data
        }

        console.log(props.data);
    }
    componentWillReceiveProps(nextProps: DataListProps<T>) {
        if (this.props.data != nextProps.data) {
            this.setState({ filteredData: nextProps.data });
        }
    }
    handleOnSearchBarChange = (e: React.FormEvent<HTMLInputElement>) => {
        const searchString = e.currentTarget.value.toLowerCase();
        if (searchString === '') {
            this.setState({ filteredData: this.props.data });
            return;
        }

        const filteredData = this.props.data.filter((item) => {
            if (this.props.predicate) {
                return this.props.predicate(item, searchString);
            }
            return false;
        })

        console.log(filteredData);

        this.setState({ filteredData });
    }
    render() {
        const newProps: DataListProps<T> = {
            ...this.props,
            data: this.state.filteredData
        };
        return (
            <div>
                <SearchBar hidden={this.props.isLoading} onSearchBarChange={this.handleOnSearchBarChange} />
                <DataList { ...newProps } />
            </div>
        )
    }
}