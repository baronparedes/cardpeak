import * as React from 'react'
import { Panel, Button } from 'react-bootstrap'
import DashboardContainer from './DashboardContainer'


const DashboardView: React.StatelessComponent<{}> = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <DashboardContainer />
        </div>
    )
}

export default DashboardView;