import * as React from 'react'
import ReferencesContainer from './ReferencesContainer'
import { Panel } from 'react-bootstrap'

const ReferencesView = () => {
    return (
        <div>
            <h2>References</h2>
            <Panel>
                <ReferencesContainer />
            </Panel>
        </div>
    )
}

export default ReferencesView;