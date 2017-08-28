import * as React from 'react'
import * as DatePickerBootstrap from 'react-bootstrap-date-picker'
import { FormGroup } from 'react-bootstrap'

interface DatePickerProps {
    value?: string,
    onChange?: (value: string, formattedValue: string) => void,
    disabled?: boolean,
    showClearButton?: boolean
}

export const DatePickerForm = (props: DatePickerProps) => {
    return (
        <DatePickerBootstrap
            onChange={props.onChange}
            className="date-picker"
            showTodayButton
            showClearButton={props.showClearButton}
            clearButtonElement={<i className="fa fa-lg fa-eraser"></i>}
            disabled={props.disabled}
            value={props.value}>
        </DatePickerBootstrap>
    )
}

export const DatePicker = (props: DatePickerProps) => {
    return (
        <FormGroup>
            <DatePickerForm {...props} />
        </FormGroup>
    )
}