import * as React from 'react'
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

interface SearchBarProps {
    onSearchBarChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    hidden?: boolean;
}

export class SearchBar extends React.Component<SearchBarProps, undefined> {
    controls: {
        searchInput?: HTMLInputElement;
    } = {};
    constructor(props: SearchBarProps) {
        super(props);
    }
    handleOnFocusSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.select();
    }
    render() {
        return (
            <FormGroup>
                {
                    this.props.hidden ? null :
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-search fa-lg"></i>
                            </InputGroup.Addon>
                            <input type="text" placeholder="search" className="form-control"
                                onFocus={this.handleOnFocusSearch}
                                onChange={this.props.onSearchBarChange}
                                ref={(input) => this.controls.searchInput = input} />
                        </InputGroup>
                }
            </FormGroup>
        )
    }
}