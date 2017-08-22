import * as React from 'react'
import { Button } from 'react-bootstrap'

const SelectedAgent = (props: { agent: CardPeak.Types.Agent }) => {
    if (!!!props.agent) {
        return (
            <div>
                <span className="text-muted spacer-right">Select an Agent</span>
                <Button>
                    <i className="fa fa-sm fa-users"></i>
                </Button>    
            </div>
        );
    }
    return (
        <h5 className="spacer-right">
            <span className="spacer-right">
                {props.agent.firstName + " " + props.agent.lastName}    
            </span>
            <Button>
                <i className="fa fa-sm fa-users"></i>
            </Button>
        </h5>
    );
}

export default SelectedAgent;