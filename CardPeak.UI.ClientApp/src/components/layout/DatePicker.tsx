import * as React from 'react'
import * as DatePickerBootstrap from 'react-bootstrap-date-picker'
import { FormGroup } from 'react-bootstrap'

interface DatePickerProps {
    value?: string,
    onChange?: (value: string, formattedValue: string) => void
}

export const DatePicker = (props: DatePickerProps) => {
    return (
        <FormGroup>
            <DatePickerBootstrap
                onChange={props.onChange}
                className="date-picker"
                showTodayButton
                showClearButton={false}
                value={props.value}>
            </DatePickerBootstrap>
        </FormGroup>
    )
}