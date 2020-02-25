import * as React from 'react';
import {
    DataList,
    DataListDisplayProps,
    DataListProps,
    SearchBar
} from './';

interface DataListFilteredProps<T> {
    predicate: (item: T, searchString: string) => any;
    hideSearchBar?: boolean;
}

interface DataListFilteredState<T> {
    filteredData?: T[];
    searchString?: string;
}

export class DataListFiltered<T> extends React.Component<
    DataListProps<T> &
        DataListDisplayProps<T> &
        DataListFilteredProps<T>,
    DataListFilteredState<T>
> {
    constructor(
        props: DataListProps<T> &
            DataListDisplayProps<T> &
            DataListFilteredProps<T>
    ) {
        super(props);
        this.state = {
            filteredData: props.data,
            searchString: ''
        };
    }
    componentWillReceiveProps(nextProps: DataListProps<T>) {
        if (this.props.data != nextProps.data) {
            this.filterData(nextProps.data, this.state.searchString);
        }
    }
    handleOnSearchBarChange = (
        e: React.FormEvent<HTMLInputElement>
    ) => {
        const searchString = e.currentTarget.value.toLowerCase();
        this.setState({ searchString });
        this.filterData(this.props.data, searchString);
    };
    filterData = (data: T[], searchString: string) => {
        if (searchString === '') {
            this.setState({ filteredData: data });
            return;
        }

        const filteredData = data.filter(item => {
            if (this.props.predicate) {
                return this.props.predicate(item, searchString);
            }
            return false;
        });

        this.setState({ filteredData });
    };
    render() {
        return (
            <div>
                <SearchBar
                    onSearchBarChange={this.handleOnSearchBarChange}
                    hidden={
                        this.props.isLoading || this.props.hideSearchBar
                    }
                    disabled={
                        this.props.isLoading || this.props.hideSearchBar
                    }
                />
                <DataList
                    {...this.props}
                    data={this.state.filteredData}
                />
            </div>
        );
    }
}
