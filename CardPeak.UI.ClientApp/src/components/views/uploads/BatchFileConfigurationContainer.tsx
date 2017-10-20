import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'
import * as UploadActions from '../../../services/actions/uploadActions'

import { Panel } from 'react-bootstrap'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { FormFieldDropdown, SpinnerBlock, ErrorLabel } from '../../layout'

import BatchFileConfigurationForm from './BatchFileConfigurationForm'

interface BatchFileConfigurationContainerProps {
    banks?: CardPeak.Entities.Reference[];
    selectedBatchFileConfig?: CardPeak.Entities.BatchFileConfiguration;
    loadingBanks?: boolean;
    loadingBatchFileConfig?: boolean;
    postingBatchFileConfig?: boolean
}

interface BatchFileConfigurationContainerDispatchProps {
    settingsActions?: typeof SettingsActions;
    uploadActions?: typeof UploadActions;
}

interface BatchFileConfigurationContainerState {
    loadingBatchFileConfigError?: string;
}

class BatchFileConfigurationContainer extends React.Component<BatchFileConfigurationContainerProps & BatchFileConfigurationContainerDispatchProps, BatchFileConfigurationContainerState> {
    constructor(props: BatchFileConfigurationContainerProps & BatchFileConfigurationContainerDispatchProps) {
        super(props);
        this.state = {
            loadingBatchFileConfigError: undefined,
        }
    }
    handleOnBankChange = (e: any) => {
        const bankId = e.target.value;
        if (bankId != 0) {
            this.props.uploadActions.getBatchFileConfigStart(bankId, (error: string) => {
                this.setState({ loadingBatchFileConfigError: error });
            });
        }
        else {
            this.props.uploadActions.clearBatchFileConfig();
        }
    }
    componentDidMount() {
        this.props.settingsActions.loadReferencesStart();
    }
    componentWillUnmount() {
        this.props.uploadActions.clearBatchFileConfig();
    }
    render() {
        return (
            <div>
                <Panel>
                    {
                        this.props.loadingBanks ? <SpinnerBlock /> :
                            <fieldset disabled={this.props.loadingBatchFileConfig || this.props.postingBatchFileConfig}>
                                <FormFieldDropdown
                                    block
                                    controlId="form-bank"
                                    label="Bank"
                                    name="bankId"
                                    isRequired
                                    value={this.props.selectedBatchFileConfig ? this.props.selectedBatchFileConfig.bankId : 0}
                                    onChange={this.handleOnBankChange} >
                                    <option key={0} value={0}>Select...</option>
                                    {
                                        this.props.banks.map((bank) => {
                                            return (
                                                <option key={bank.referenceId} value={bank.referenceId}>
                                                    {bank.description}
                                                </option>
                                            )
                                        })
                                    }
                                </FormFieldDropdown>
                            </fieldset>
                    }
                    <ErrorLabel error={this.state.loadingBatchFileConfigError} />
                </Panel>
                {
                    this.props.loadingBatchFileConfig ? <SpinnerBlock /> : null
                        
                }
                {
                    !this.props.selectedBatchFileConfig ? null :
                        <Panel>
                            <BatchFileConfigurationForm
                                isSaving={this.props.postingBatchFileConfig}
                                onSave={this.props.uploadActions.postBatchFileConfigStart}
                                batchFileConfiguration={this.props.selectedBatchFileConfig} />
                        </Panel>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): BatchFileConfigurationContainerProps => ({
    banks: state.settingsModel.banks,
    loadingBanks: state.settingsModel.loadingBanks,
    loadingBatchFileConfig: state.batchUploadModel.loadingBatchFileConfiguration,
    selectedBatchFileConfig: state.batchUploadModel.selectedBatchFileConfiguration,
    postingBatchFileConfig: state.batchUploadModel.postingBatchFileConfiguration
});

const mapDispatchToProps = (dispatch: any): BatchFileConfigurationContainerDispatchProps => {
    return {
        settingsActions: bindActionCreators(SettingsActions as any, dispatch),
        uploadActions: bindActionCreators(UploadActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BatchFileConfigurationContainer);