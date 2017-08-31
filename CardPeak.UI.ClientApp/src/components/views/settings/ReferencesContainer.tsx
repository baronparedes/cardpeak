﻿import * as React from 'react'
import * as SettingsActions from '../../../services/actions/settingsAction'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { RootState } from '../../../services/reducers'

import { Grid, Row, Col } from 'react-bootstrap'

import ReferenceList from './ReferenceList'

interface ReferencesContainerProps {
}

interface ReferencesContainerDispatchProps {
    actions?: typeof SettingsActions;
}

interface ReferencesContainerState {
}


class ReferencesContainer extends React.Component<CardPeak.Models.SettingsModel & ReferencesContainerProps & ReferencesContainerDispatchProps, ReferencesContainerState>{
    constructor(props: CardPeak.Models.SettingsModel & ReferencesContainerProps & ReferencesContainerDispatchProps) {
        super(props);
    }
    handleOnSaveBank = (data: CardPeak.Entities.Reference) => {
        console.log('save bank');
    }
    handleOnSaveCardCategory = (data: CardPeak.Entities.Reference) => {
        console.log('save card category');
    }
    componentDidMount() {
        this.props.actions.loadReferencesStart();
    }
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <h4>Banks</h4>
                            <ReferenceList
                                onSaveReference={this.handleOnSaveBank}
                                references={this.props.banks}
                                referenceTypeId={this.props.bankReferenceTypeId}
                                isLoading={this.props.loadingBanks} />
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <h4>Categories</h4>
                            <ReferenceList
                                onSaveReference={this.handleOnSaveCardCategory}
                                references={this.props.cardCategories}
                                referenceTypeId={this.props.cardCategoryReferenceTypeId}
                                isLoading={this.props.loadingCardCategories} />
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): CardPeak.Models.SettingsModel => ({
    ...state.settingsModel
});

const mapDispatchToProps = (dispatch: any): ReferencesContainerDispatchProps => {
    return {
        actions: bindActionCreators(SettingsActions as any, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReferencesContainer);