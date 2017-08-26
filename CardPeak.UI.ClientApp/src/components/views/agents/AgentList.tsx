import * as React from 'react'
import { SearchBar, SpinnerGrid, ListNoRecordsRow } from '../../layout'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import AgentDetail from './AgentDetail'
import AgentDetailRowLayout from './AgentDetailRowLayout'

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
                        }) : <ListNoRecordsRow />
            }
        </Grid>
    )
}

const AgentList = (props: AgentListProps) => {
    return (
        <div>
            <SearchBar hidden={props.isLoading} />
            <Grid fluid className="grid-header text-muted no-padding">
                <Panel className="panel-row-header">
                    <AgentDetailRowLayout isHeader={true} />
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