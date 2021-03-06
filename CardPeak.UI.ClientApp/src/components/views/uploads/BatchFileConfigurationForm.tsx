﻿import * as React from 'react';
import { Col, Form, FormGroup } from 'react-bootstrap';
import {
    ConfirmButton,
    ErrorLabel,
    FormFieldDropdown,
    FormFieldInput
} from '../../layout';

interface BatchFileConfigurationFormProps {
    batchFileConfiguration: CardPeak.Entities.BatchFileConfiguration;
    isSaving: boolean;
    onSave: (
        data: CardPeak.Entities.BatchFileConfiguration,
        errorCallback?: (e: string) => void
    ) => void;
}

interface BatchFileConfigurationFormState {
    batchFileConfiguration?: CardPeak.Entities.BatchFileConfiguration;
    errors: {
        [error: string]: string;
    };
    postingBatchFileConfigError?: string;
    onSaveErrorMessage?: string;
}

export default class BatchFileConfigurationForm extends React.Component<
    BatchFileConfigurationFormProps,
    BatchFileConfigurationFormState
> {
    constructor(props: BatchFileConfigurationFormProps) {
        super(props);
        this.state = {
            batchFileConfiguration: this.props.batchFileConfiguration,
            errors: {
                bankId: '',
                aliasColumn: '',
                cardCategoryColumn: '',
                prodcutTypeColumn: '',
                approvalDateColumn: ''
            }
        };
    }
    handleOnChangeValue = (name: any, value: any) => {
        let errors = this.state.errors;
        errors[name] = '';
        this.setState({
            batchFileConfiguration: {
                ...this.state.batchFileConfiguration,
                [name]: value
            },
            errors
        });
    };
    handleOnChange = (e: any) => {
        this.handleOnChangeValue([e.target.name], e.target.value);
    };
    handleOnChangeBoolean = (e: any) => {
        this.handleOnChangeValue(
            [e.target.name],
            e.target.value == 'true' ? true : false
        );
    };
    handleOnChangeNumber = (e: any) => {
        let value: number | undefined;
        if (e.target.value) {
            value = parseInt(e.target.value);
        } else {
            value = undefined;
        }
        this.handleOnChangeValue([e.target.name], value);
    };
    hasErrors = () => {
        this.handleErrors();
        if (
            !!this.state.errors.bankId ||
            !!this.state.errors.aliasColumn ||
            !!this.state.errors.cardCategoryColumn ||
            !!this.state.errors.productTypeColumn ||
            !!this.state.errors.approvalDateColumn
        ) {
            return true;
        }
        return false;
    };
    handleErrors = () => {
        let errors = this.state.errors;
        if (
            !this.state.batchFileConfiguration.bankId ||
            this.state.batchFileConfiguration.bankId == 0
        )
            errors.bankId = '*';
        if (!this.state.batchFileConfiguration.aliasColumn)
            errors.aliasColumn = '*';
        if (!this.state.batchFileConfiguration.cardCategoryColumn)
            errors.cardCategoryColumn = '*';
        if (!this.state.batchFileConfiguration.productTypeColumn)
            errors.productTypeColumn = '*';
        if (!this.state.batchFileConfiguration.approvalDateColumn)
            errors.approvalDateColumn = '*';
        this.setState({ errors });
        return errors;
    };
    handleOnConfirm = () => {
        this.setState({ onSaveErrorMessage: undefined });
        this.props.onSave(
            this.state.batchFileConfiguration,
            (e: string) => {
                this.setState({ onSaveErrorMessage: e });
            }
        );
    };
    handleOnToggleModal = () => {
        this.setState({ onSaveErrorMessage: undefined });
    };
    componentWillReceiveProps(
        nextProps: BatchFileConfigurationFormProps
    ) {
        if (
            this.state.batchFileConfiguration !=
            nextProps.batchFileConfiguration
        ) {
            this.setState({
                batchFileConfiguration: nextProps.batchFileConfiguration
            });
        }
    }
    renderButtons() {
        return (
            <FormGroup>
                <Col sm={12} className="text-right">
                    <ConfirmButton
                        useButtonLoading
                        bsStyle="success"
                        buttonLabel="Save"
                        confirmTitle="save batch file configuration details"
                        confirmMessage="Do you want to continue?"
                        onConfirm={this.handleOnConfirm}
                        onToggleConfirm={this.handleOnToggleModal}
                        onPreventToggle={this.hasErrors}
                        isLoading={this.props.isSaving}
                        disabled={this.props.isSaving}
                    />
                </Col>
                <Col sm={12} xs={12} md={12} lg={12}>
                    <ErrorLabel error={this.state.onSaveErrorMessage} />
                </Col>
            </FormGroup>
        );
    }
    render() {
        return (
            <div>
                <Form
                    horizontal
                    onSubmit={e => {
                        e.preventDefault();
                    }}>
                    <fieldset disabled={this.props.isSaving}>
                        <Col lg={6} md={6}>
                            <FormFieldDropdown
                                controlId="form-hasHeader"
                                label="has header"
                                name="hasHeader"
                                isRequired
                                value={
                                    this.state.batchFileConfiguration
                                        .hasHeader
                                        ? 'true'
                                        : 'false'
                                }
                                onChange={this.handleOnChangeBoolean}>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </FormFieldDropdown>
                            <FormFieldInput
                                controlId="form-skipNumberOfRows"
                                type="number"
                                name="skipNumberOfRows"
                                label="skip rows"
                                value={
                                    this.state.batchFileConfiguration
                                        .skipNumberOfRows
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-aliasColumn"
                                type="number"
                                name="aliasColumn"
                                label="alias"
                                isRequired
                                error={this.state.errors.aliasColumn}
                                value={
                                    this.state.batchFileConfiguration
                                        .aliasColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-cardCategoryColumn"
                                type="number"
                                name="cardCategoryColumn"
                                label="card category"
                                isRequired
                                error={
                                    this.state.errors.cardCategoryColumn
                                }
                                value={
                                    this.state.batchFileConfiguration
                                        .cardCategoryColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-productTypeColumn"
                                type="number"
                                name="productTypeColumn"
                                label="product type"
                                isRequired
                                error={
                                    this.state.errors.productTypeColumn
                                }
                                value={
                                    this.state.batchFileConfiguration
                                        .productTypeColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-approvalDateColumn"
                                type="number"
                                name="approvalDateColumn"
                                label="approval date"
                                isRequired
                                error={
                                    this.state.errors.approvalDateColumn
                                }
                                value={
                                    this.state.batchFileConfiguration
                                        .approvalDateColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldDropdown
                                controlId="form-dateFormat"
                                label="date fromat"
                                name="approvalDateFormat"
                                isRequired
                                value={
                                    this.state.batchFileConfiguration
                                        .approvalDateFormat
                                }
                                onChange={this.handleOnChange}>
                                <option value="MM/dd/yyyy">
                                    MM/dd/yyyy
                                </option>
                                <option value="dd/MM/yyyy">
                                    dd/MM/yyyy
                                </option>
                            </FormFieldDropdown>
                        </Col>
                        <Col lg={6} md={6}>
                            <FormFieldInput
                                controlId="form-ref1Column"
                                type="number"
                                name="ref1Column"
                                label="reference 1"
                                value={
                                    this.state.batchFileConfiguration
                                        .ref1Column
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-ref2Column"
                                type="number"
                                name="ref2Column"
                                label="reference 2"
                                value={
                                    this.state.batchFileConfiguration
                                        .ref2Column
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-clientFullNameColumn"
                                type="number"
                                name="clientFullNameColumn"
                                label="full name"
                                value={
                                    this.state.batchFileConfiguration
                                        .clientFullNameColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-clientFirstNameColumn"
                                type="number"
                                name="clientFirstNameColumn"
                                label="first name"
                                value={
                                    this.state.batchFileConfiguration
                                        .clientFirstNameColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-clientMiddleNameColumn"
                                type="number"
                                name="clientMiddleNameColumn"
                                label="middle name"
                                value={
                                    this.state.batchFileConfiguration
                                        .clientMiddleNameColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-clientLastNameColumn"
                                type="number"
                                name="clientLastNameColumn"
                                label="last name"
                                value={
                                    this.state.batchFileConfiguration
                                        .clientLastNameColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                            <FormFieldInput
                                controlId="form-cardCountColumn"
                                type="number"
                                name="cardCountColumn"
                                label="card count"
                                value={
                                    this.state.batchFileConfiguration
                                        .cardCountColumn
                                }
                                onChange={this.handleOnChangeNumber}
                            />
                        </Col>
                        {this.renderButtons()}
                    </fieldset>
                </Form>
            </div>
        );
    }
}
