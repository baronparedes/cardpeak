import * as React from 'react'
import * as DatePickerBootstrap from 'react-bootstrap-date-picker'
import { FormGroup, ControlLabel } from 'react-bootstrap'

interface DatePickerProps {
    label?: string
}

export const DatePicker = (props: DatePickerProps) => {
    return (
        <FormGroup>
            <DatePickerBootstrap
                className="date-picker"
                showTodayButton
                clearButtonElement={<i className="fa fa-lg fa-eraser"></i>}
                defaultValue={new Date().toISOString()}>
            </DatePickerBootstrap>
        </FormGroup>
    )
}