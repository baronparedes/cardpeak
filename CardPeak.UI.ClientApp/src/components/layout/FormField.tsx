import * as React from 'react';
import { dateFormatISO } from '../../helpers/dateHelpers'
import { FormGroup, FormControl, ControlLabel, Col, InputGroup, Radio } from 'react-bootstrap'
import { DatePickerForm, RadioGroup } from './'

interface FormFieldProps {
    controlId: string,
    error?: string,
    label: string,
    type?: string,
    name: string,
    value: any,
    options?: string[][]
    onChange?: (e: any) => void,
    onChangeDate?: (v: string, f: string) => void,
    onFocus?: (e: any) => void,
    isRequired?: boolean,
}

export const FormFieldInline: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormGroup controlId={props.controlId} validationState={!!props.error && props.error != "" ? "error" : null}>
            <Col componentClass={ControlLabel} sm={2}>
                {props.label}
            </Col>
            <Col sm={10}>
                <InputGroup>
                    {props.children}
                </InputGroup>
            </Col>
        </FormGroup>
    )
}

export const FormField: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormGroup controlId={props.controlId} validationState={!!props.error && props.error != "" ? "error" : null}>
            <Col componentClass={ControlLabel} sm={2}>
                {props.label}
            </Col>
            <Col sm={10}>
                <InputGroup>
                    {props.children}
                    <InputGroup.Addon className="addon-form">
                        {props.isRequired ? <i className="fa fa-asterisk fa-fw text-danger" aria-hidden /> : null}
                    </InputGroup.Addon>
                </InputGroup>
            </Col>
        </FormGroup>
    )
}

export const FormFieldRadioGroup: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormFieldInline {...props}>
            <RadioGroup
                name={props.name}
                value={props.value}
                options={props.options}
                onChange={props.onChange} />
        </FormFieldInline>
    )
}

export const FormFieldDate: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormFieldInline {...props}>
            <DatePickerForm
                showClearButton={false}
                value={dateFormatISO(new Date(props.value))}
                onChange={props.onChange} />
        </FormFieldInline>
    )
}

export const FormFieldInput: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormField {...props}>
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
        </FormField>
    );
};