﻿import * as React from 'react';
import { FormFieldDropdown } from './';

interface YearProps {
    availableYears?: CardPeak.Entities.ApprovalMetric<number>[];
}

interface YearMonthProps {
    refreshing?: boolean;
    error?: string;
    value?: any;
    onChange?: (e: any) => void;
    hideHistorical?: boolean;
    hideValue?: boolean;
}

export const YearPicker: React.StatelessComponent<YearProps &
    YearMonthProps> = props => {
    return (
        <FormFieldDropdown
            disabled={props.refreshing}
            controlId="form-year"
            label="year"
            name="year"
            error={props.error}
            value={props.value}
            isRequired
            onChange={props.onChange}>
            {props.hideHistorical ? null : (
                <option value={0}>Historical</option>
            )}
            {props.availableYears
                ? props.availableYears.map(_ => {
                      return (
                          <option key={_.key} value={_.key}>
                              {props.hideValue
                                  ? _.key
                                  : _.key + ' (' + _.value + ')'}
                          </option>
                      );
                  })
                : null}
        </FormFieldDropdown>
    );
};

export const MonthPicker: React.StatelessComponent<YearMonthProps> = props => {
    return (
        <FormFieldDropdown
            disabled={props.refreshing}
            controlId="form-month"
            label="month"
            name="month"
            value={props.value}
            onChange={props.onChange}>
            <option value={0}>All</option>
            <option value={1}>Jan</option>
            <option value={2}>Feb</option>
            <option value={3}>Mar</option>
            <option value={4}>Apr</option>
            <option value={5}>May</option>
            <option value={6}>Jun</option>
            <option value={7}>Jul</option>
            <option value={8}>Aug</option>
            <option value={9}>Sep</option>
            <option value={10}>Oct</option>
            <option value={11}>Nov</option>
            <option value={12}>Dec</option>
        </FormFieldDropdown>
    );
};
