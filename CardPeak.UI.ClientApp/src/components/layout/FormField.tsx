import * as React from 'react';
import { FormGroup, FormControl, ControlLabel, Col, InputGroup } from 'react-bootstrap'

interface FormFieldProps {
    controlId: string,
    error: string,
    label: string,
    type: string,
    name: string,
    value: any,
    onChange?: (e: any) => void,
    onFocus?: (e: any) => void
}

const InputAddOn: React.StatelessComponent<{}> = (props) => {
    return (
        <InputGroup>
            <InputGroup.Addon>
                <i className="fa fa-asterisk text-danger" />
            </InputGroup.Addon>
            {props.children}
        </InputGroup>
    );
}

export const FormField: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormGroup controlId={props.controlId} validationState={!!props.error && props.error != "" ? "error" : null}>
            <Col componentClass={ControlLabel} sm={2}>
                {props.label}
            </Col>
            <Col sm={10}>
                <InputAddOn>
                    {
                        props.type === 'textarea' ?
                            (
                                <FormControl
                                    componentClass="textarea"
                                    rows={4}
                                    placeholder={props.label}
                                    name={props.name}
                                    value={props.value}
                                    onFocus={props.onFocus}
                                    onChange={props.onChange} />
                            ) :
                            (
                                <FormControl
                                    type={props.type}
                                    placeholder={props.label}
                                    name={props.name}
                                    value={props.value}
                                    onFocus={props.onFocus}
                                    onChange={props.onChange} />
                            )
                    }
                </InputAddOn>
            </Col>
        </FormGroup>
    );
};