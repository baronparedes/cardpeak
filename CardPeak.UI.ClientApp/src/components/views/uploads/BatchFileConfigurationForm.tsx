import * as React from 'react'
import { Form, Row, Col, FormGroup } from 'react-bootstrap'
import { ConfirmButtonLoading, FormFieldInput, FormFieldDropdown, FormFieldBoolean } from '../../layout'

interface BatchFileConfigurationFormProps {
    batchFileConfiguration: CardPeak.Entities.BatchFileConfiguration,
    isSaving?: boolean,
    onSave?: (data: CardPeak.Entities.BatchFileConfiguration, errorCallback?: (e: string) => void) => void
}

interface BatchFileConfigurationFormState {
    batchFileConfiguration?: CardPeak.Entities.BatchFileConfiguration
    errors: {
        [error: string]: string,
    };
    postingBatchFileConfigError?: string;
    onSaveErrorMessage?: string
}

export default class BatchFileConfigurationForm extends React.Component<BatchFileConfigurationFormProps, BatchFileConfigurationFormState> {
    constructor(props: BatchFileConfigurationFormProps) {
        super(props);
        this.state = {
            batchFileConfiguration: this.props.batchFileConfiguration,
            errors: {
                bankId: '',
                aliasColumn: '',
                cardCategoryColumn: ''
            }
        }
    }
    handleOnChangeValue = (name: any, value: any) => {
        let errors = this.state.errors;
        errors[name] = '';
        this.setState({
            batchFileConfiguration: {
                ...this.state.batchFileConfiguration,
                [name]: value,
            },
            errors
        });
    }
    handleOnChange = (e: any) => {
        this.handleOnChangeValue([e.target.name], e.target.value);
    }
    handleOnChangeBoolean = (e: any) => {
        this.handleOnChangeValue([e.target.name], e.target.value == "true" ? true : false);
    }
    handleOnChangeNumber = (e: any) => {
        let value: number | undefined;
        if (e.target.value) {
            value = parseInt(e.target.value);
        }
        else {
            value = undefined;
        }
        this.handleOnChangeValue([e.target.name], value);
    }
    hasErrors = () => {
        this.handleErrors();
        if (!!this.state.errors.bankId && !!this.state.errors.aliasColumn && !!this.state.errors.cardCategoryColumn) {
            return true;
        }
        return false;
    }
    handleErrors = () => {
        let errors = this.state.errors;
        if (!this.state.batchFileConfiguration.bankId || this.state.batchFileConfiguration.bankId == 0) errors.bankId = "*";
        if (!this.state.batchFileConfiguration.aliasColumn) errors.aliasColumn = "*";
        if (!this.state.batchFileConfiguration.cardCategoryColumn) errors.cardCategoryColumn = "*";
        this.setState({ errors });
        return errors;
    }
    handleOnConfirm = () => {
        if (this.hasErrors()) {
            return;
        }

        //this.setState({ onSaveErrorMessage: undefined });
        //this.props.onSave(this.state.batchFileConfiguration, (e: string) => {
        //    this.setState({ onSaveErrorMessage: e })
        //});
        console.log(this.state.batchFileConfiguration);
    }
    handleOnToggleModal = () => {
        this.setState({ onSaveErrorMessage: undefined });
    }
    componentWillReceiveProps(nextProps: BatchFileConfigurationFormProps) {
        if (this.state.batchFileConfiguration != nextProps.batchFileConfiguration) {
            this.setState({ batchFileConfiguration: nextProps.batchFileConfiguration });
        }
    }
    renderButtons() {
        return (
            <FormGroup>
                <Col sm={12} className="text-right">
                    <ConfirmButtonLoading
                        bsStyle="success"
                        buttonLabel="Save"
                        confirmTitle="save batch file configuration details"
                        confirmMessage="Do you want to continue?"
                        onConfirm={this.handleOnConfirm}
                        onToggleConfirm={this.handleOnToggleModal}
                        onPreventToggle={this.hasErrors}
                        isLoading={this.props.isSaving}
                        disabled={this.props.isSaving} />
                </Col>
                <Col sm={12} xs={12} md={12} lg={12} className="text-danger">
                    {
                        this.state.onSaveErrorMessage ?
                            this.state.onSaveErrorMessage
                            : null
                    }
                </Col>
            </FormGroup>
        )
    }
    render() {
        return (
            <div className="container-fluid">
                <Form horizontal onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset disabled={this.props.isSaving}>
                        <FormFieldBoolean
                            controlId="form-hasHeader"
                            name="hasHeader"
                            label="has header"
                            value={this.state.batchFileConfiguration.hasHeader}
                            onChange={this.handleOnChange}/>
                        <FormFieldInput
                            controlId="form-skipNumberOfRows"
                            type="number"
                            name="skipNumberOfRows"
                            label="skip rows"
                            value={this.state.batchFileConfiguration.skipNumberOfRows}
                            onChange={this.handleOnChangeNumber} />
                        <FormFieldInput
                            controlId="form-aliasColumn"
                            type="number"
                            name="aliasColumn"
                            label="alias column"
                            isRequired
                            error={this.state.errors.aliasColumn}
                            value={this.state.batchFileConfiguration.aliasColumn}
                            onChange={this.handleOnChangeNumber} />
                        {this.renderButtons()}
                    </fieldset>
                </Form>
            </div>
        )
    }
}