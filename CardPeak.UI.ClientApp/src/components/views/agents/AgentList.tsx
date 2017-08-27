import * as React from 'react'
import { SearchBar, SpinnerRow, ListNoRecordsRow, GridList } from '../../layout'
import { Grid, Row, Col, Panel } from 'react-bootstrap'
import AgentDetail from './AgentDetail'
import AgentDetailRowLayout from './AgentDetailRowLayout'

interface AgentListProps {
    agents?: CardPeak.Entities.Agent[],
    onSelectAgent: (agent: CardPeak.Entities.Agent) => void,
    isLoading?: boolean
}

const AgentList = (props: AgentListProps) => {
    return (
        <div>
            <SearchBar hidden={props.isLoading} />
            <GridList header={<AgentDetailRowLayout isHeader={true} />}>
                {
                    props.isLoading ?
                        <SpinnerRow /> :
                        props.agents && props.agents.length > 0 ?
                            props.agents.map((agent) => {
                                return (
                                    <AgentDetail agent={agent} key={agent.agentId} onSelectAgent={props.onSelectAgent} />
                                )
                            }) : <ListNoRecordsRow />
                }
            </GridList>
        </div>
    )
}

export default AgentList;