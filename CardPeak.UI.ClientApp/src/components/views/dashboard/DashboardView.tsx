import * as React from 'react'
import { Panel, Button } from 'react-bootstrap'

interface DashboardViewProps {
    selectedAgent: CardPeak.Types.Agent;
}

export default class DashbaordView extends React.Component<DashboardViewProps, undefined> {
    constructor(props: DashboardViewProps) {
        super(props);
    }
    render() {
        return (
            <div>
                <h2>Dashboard</h2>
                <div className="container">
                    <Panel>
                        {this.props.selectedAgent ? "" : <span className="text-muted spacer-right">select an agent</span>}
                        <Button>
                            <i className="fa fa-sm fa-users"></i>
                        </Button>
                    </Panel>
                </div>
            </div>
        )
    }
}