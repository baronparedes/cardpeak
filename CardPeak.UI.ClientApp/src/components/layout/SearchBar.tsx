import * as React from 'react'
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

interface SearchBarProps {
    onSearchBarChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    hidden?: boolean;
    disabled?: boolean;
    showButton?: boolean;
    onSearchBarClick?: () => void
    onSearchBarKeyPress?: (e: any) => void
    placeholder?: string,
    name?: string
}

export class SearchBar extends React.Component<SearchBarProps, undefined> {
    constructor(props: SearchBarProps) {
        super(props);
    }
    handleOnFocusSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.select();
    }
    render() {
        return (
            <FormGroup className="hidden-print">
                {
                    this.props.hidden ? null :
                        <InputGroup>
                            {
                                this.props.showButton ? null :
                                    <InputGroup.Addon>
                                        <i className="fa fa-search fa-lg"></i>
                                    </InputGroup.Addon>
                            }
                            <input
                                type="text"
                                name={this.props.name}
                                placeholder={this.props.placeholder ? this.props.placeholder : "search"}
                                className="form-control"
                                onFocus={this.handleOnFocusSearch}
                                onChange={this.props.onSearchBarChange}
                                onKeyPress={this.props.onSearchBarKeyPress}
                                disabled={this.props.disabled} />
                            {
                                !this.props.showButton ? null :
                                    <InputGroup.Button>
                                        <Button
                                            disabled={this.props.disabled}
                                            bsStyle="primary"
                                            onClick={this.props.onSearchBarClick}>
                                            <i className="fa fa-search"></i>
                                        </Button>
                                    </InputGroup.Button>
                            }
                        </InputGroup>
                }
            </FormGroup>
        )
    }
}