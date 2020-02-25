import * as React from 'react';
import { Panel } from 'react-bootstrap';
import ReferencesContainer from './ReferencesContainer';

const ReferencesView = () => {
    return (
        <div>
            <h2>References</h2>
            <Panel>
                <ReferencesContainer />
            </Panel>
        </div>
    );
};

export default ReferencesView;
