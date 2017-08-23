import * as React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import { SpinnerGrid } from '../../layout/Spinner'
import AgentDetail from './AgentDetail'
import AgentRowLayout from './AgentRowLayout'

interface AgentListProps {
    agents?: CardPeak.Entities.Agent[],
    handleOnSelectAgent: (agent: CardPeak.Entities.Agent) => void,
    isLoading?: boolean
}

const LoadAgentList = (props: AgentListProps) => {
    return (
        <Grid fluid className="grid-rows margin-top no-padding">
            {
                props.isLoading ?
                    <SpinnerGrid /> :
                    props.agents && props.agents.length > 0 ?
                        props.agents.map((agent) => {
                            return (
                                <AgentDetail agent={agent} key={agent.agentId} handleOnSelectAgent={props.handleOnSelectAgent} />
                            )
                        }) : null
            }
        </Grid>
    )
}

const AgentList: React.StatelessComponent<AgentListProps> = (props) => {
    return (
        <div>
            <Grid fluid className="grid-header text-muted no-padding">
                <Panel className="panel-row-header">
                    <AgentRowLayout isHeader={true} />
                </Panel>
            </Grid>    
            <LoadAgentList
                agents={props.agents}
                handleOnSelectAgent={props.handleOnSelectAgent}
                isLoading={props.isLoading} /> 
        </div>
    )
}

export default AgentList;