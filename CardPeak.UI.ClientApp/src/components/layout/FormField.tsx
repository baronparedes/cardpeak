import * as React from 'react';
import { dateFormatISO } from '../../helpers/dateHelpers'
import { FormGroup, FormControl, ControlLabel, Col, InputGroup, Radio, Checkbox } from 'react-bootstrap'
import { DatePickerForm, RadioGroup } from './'

interface FormFieldProps {
    controlId: string,
    label: string,
    name: string,
    value?: any,
    error?: string,
    type?: string,
    options?: string[][]
    onChange?: (e: any) => void,
    onChangeDate?: (v: string, f: string) => void,
    onFocus?: (e: any) => void,
    isRequired?: boolean,
    ref?: (control: any) => void,
    accept?: string
}

export const FormFieldInline: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormGroup controlId={props.controlId} validationState={!!props.error && props.error != "" ? "error" : null}>
            <Col lg={2} md={3}>
                <ControlLabel className="text-muted">
                    {props.label}
                </ControlLabel>
            </Col>
            <Col>
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
            <Col lg={2} md={3}>
                <ControlLabel className="text-muted">
                    {props.label}
                </ControlLabel>
            </Col>
            <Col>
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

export const FormFieldLabel: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormGroup>
            <Col lg={2} md={3}>
                <ControlLabel className="text-muted">
                    {props.label}
                </ControlLabel>
            </Col>
            <Col>
                <FormControl.Static>
                    {props.value}
                </FormControl.Static>
            </Col>
        </FormGroup>
    )
}
export const FormFieldInput: React.StatelessComponent<FormFieldProps> = (props) => {
    let formControl = (
        <FormControl
            type={props.type}
            placeholder={props.label}
            name={props.name}
            value={props.value}
            onFocus={props.onFocus}
            onChange={props.onChange} />
    );

    if (props.type === 'textarea') {
        formControl = (
            <FormControl
                componentClass="textarea"
                rows={4}
                placeholder={props.label}
                name={props.name}
                value={props.value}
                onFocus={props.onFocus}
                onChange={props.onChange} />
        );
    }

    if (props.type === 'number') {
        let value = !props.value ? '' : props.value;
        formControl = (
            <FormControl
                type={props.type}
                placeholder={props.label}
                name={props.name}
                value={value}
                onFocus={props.onFocus}
                onChange={props.onChange} />
        );
    }

    return (
        <FormField {...props}>
            {formControl}
        </FormField>
    );
};

export const FormFieldFile: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormFieldInline {...props }>
            <FormControl
                onChange={props.onChange}
                type="file"
                placeholder={props.label}
                multiple={false}
                accept={props.accept}
                name={props.name} />
        </FormFieldInline >
    )
}

export const FormFieldDropdown: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormField {...props}>
            <FormControl
                componentClass="select"
                placeholder={props.label}
                name={props.name}
                value={props.value}
                onChange={props.onChange}>
                {props.children}
            </FormControl>
        </FormField>
    )
}

export const FormFieldBoolean: React.StatelessComponent<FormFieldProps> = (props) => {
    return (
        <FormFieldInline {...props}>
            <Checkbox
                value={props.value}
                onChange={props.onChange}
                name={props.name}>
            </Checkbox>
        </FormFieldInline>
    )
}