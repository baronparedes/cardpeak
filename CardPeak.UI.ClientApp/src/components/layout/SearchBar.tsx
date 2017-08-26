import * as React from 'react'
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap'

interface SearchBarProps {
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    hidden?: boolean;
}

export class SearchBar extends React.Component<SearchBarProps, undefined> {
    controls: {
        searchInput?: HTMLInputElement;
    } = {};
    constructor(props: SearchBarProps) {
        super(props);
    }
    handleOnClick = () => {
        this.controls.searchInput.value = '';
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
                                onChange={this.props.onChange}
                                ref={(input) => this.controls.searchInput = input} />
                            <InputGroup.Button>
                                <Button bsStyle="primary" onClick={this.handleOnClick}>
                                    <i className="fa fa-eraser fa-lg"></i>
                                </Button>
                            </InputGroup.Button>
                        </InputGroup>
                }
            </FormGroup>
        )
    }
}