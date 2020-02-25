import * as React from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../../services/actions/agentPayoutActions';
import { RootState } from '../../../services/reducers';
import {
    AgentDashboardLinkButton,
    Currency,
    DataItemProps,
    DataList
} from '../../layout';
import PayoutTotalContainer from '../../layout/PayoutTotalContainer';

type AgentPayoutList = new () => DataList<
    CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>
>;
const AgentPayoutList = DataList as AgentPayoutList;

interface AgentPayoutContainerDispatchProps {
    actions?: typeof Actions;
}

const AgentPayoutRowLayout: React.StatelessComponent<DataItemProps<
    CardPeak.Entities.ApprovalMetric<CardPeak.Entities.Agent>
>> = props => {
    return (
        <Row>
            <Col
                mdHidden
                lgHidden
                smHidden
                xsHidden={!props.isHeader}
                className="text-center">
                <span className="grid-label spacer-left">
                    agent payout
                </span>
            </Col>
            <Col sm={8} xsHidden={props.isHeader}>
                {props.isHeader
                    ? 'agent'
                    : props.item.key.firstName +
                      ' ' +
                      props.item.key.lastName}
            </Col>
            <Col
                sm={2}
                xsHidden={props.isHeader}
                className="text-center">
                {props.isHeader ? (
                    'balance'
                ) : (
                    <Currency currency={props.item.value} />
                )}
            </Col>
            <Col
                sm={2}
                xsHidden={props.isHeader}
                className="text-center">
                {props.isHeader ? (
                    'actions'
                ) : (
                    <AgentDashboardLinkButton
                        id={props.item.key.agentId}
                    />
                )}
            </Col>
        </Row>
    );
};

class AgentPayoutContainer extends React.Component<
    CardPeak.Models.AgentPayoutModel &
        AgentPayoutContainerDispatchProps,
    {}
> {
    constructor(
        props: CardPeak.Models.AgentPayoutModel &
            AgentPayoutContainerDispatchProps
    ) {
        super(props);
    }
    componentDidMount() {
        this.props.actions.getAgentPayoutStart();
    }
    componentWillUpdate(
        nextProps: CardPeak.Models.AgentPayoutModel &
            AgentPayoutContainerDispatchProps
    ) {
        if (this.props.payouts == nextProps.payouts) {
            return false;
        }
    }
    render() {
        return (
            <div>
                <h2>Agent Payouts</h2>
                <PayoutTotalContainer />
                <div>
                    <AgentPayoutList
                        onGetKey={item => item.key.agentId}
                        renderHeader={() => {
                            return <AgentPayoutRowLayout isHeader />;
                        }}
                        renderItem={(item, key) => {
                            return (
                                <AgentPayoutRowLayout
                                    item={item}
                                    key={key}
                                />
                            );
                        }}
                        data={this.props.payouts}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (
    state: RootState
): CardPeak.Models.AgentPayoutModel => ({
    ...state.agentPayoutModel
});

const mapDispatchToProps = (
    dispatch: any
): AgentPayoutContainerDispatchProps => {
    return {
        actions: bindActionCreators(Actions as any, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgentPayoutContainer);
