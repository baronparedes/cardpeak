import * as React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

export default class SelectedAgent extends React.Component<{ agent: CardPeak.Types.Agent, handleOnClick?: () => void  }, undefined> {
    onClick = (e: React.MouseEvent<React.ClassicComponent<ButtonProps, {}>>): void => {
        e.preventDefault();
        this.props.handleOnClick();
    }
    render() {
        if (!!!this.props.agent) {
            return (
                <div>
                    <span className="text-muted spacer-right text-highlight">Select an Agent</span>
                    <Button bsStyle="primary" onClick={e => this.onClick(e)}>
                        <i className="fa fa-sm fa-users"></i>
                    </Button>    
                </div>
            );
        }
        return (
            <h5 className="spacer-right">
                <span className="spacer-right text-highlight">
                    {this.props.agent.firstName + " " + this.props.agent.lastName}    
                </span>
                <Button bsStyle="primary" onClick={e => this.onClick(e)}>
                    <i className="fa fa-sm fa-users"></i>
                </Button>
            </h5>
        );
    }
}
