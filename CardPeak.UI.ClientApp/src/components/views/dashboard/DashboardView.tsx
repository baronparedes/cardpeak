import * as React from 'react'
import { Panel } from 'react-bootstrap'

const DashboardView = () => {
    return (
        <div>
            <h2>Dashboard</h2>
            <Panel bsStyle="success">Test</Panel>
            <Panel bsStyle="danger">Test</Panel>
        </div>
    )
}

export default DashboardView;