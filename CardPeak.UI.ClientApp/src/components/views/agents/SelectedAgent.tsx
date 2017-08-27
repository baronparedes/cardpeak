import * as React from 'react'
import { Button } from 'react-bootstrap'

interface SelectedAgentProps {
    agent: CardPeak.Entities.Agent,
    onAgentSelectedClick?: () => void
}

export default class SelectedAgent extends React.Component<SelectedAgentProps, undefined> {
    renderButton() {
        return (
            <Button bsStyle="primary" onClick={this.props.onAgentSelectedClick} bsSize="medium">
                <i className="fa fa-sm fa-users"></i>
            </Button>   
        )
    }
    render() {
        if (!!!this.props.agent) {
            return (
                <div>
                    <label className="text-muted spacer-right text-highlight">select an agent</label>
                    {this.renderButton()}
                </div>
            );
        }
        return (
            <h5 className="spacer-right">
                <span className="spacer-right text-highlight">
                    {this.props.agent.firstName + " " + this.props.agent.lastName}    
                </span>
                {this.renderButton()}
            </h5>
        );
    }
}
