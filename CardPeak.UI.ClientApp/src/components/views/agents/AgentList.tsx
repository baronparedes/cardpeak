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

interface AgentListState {
    filteredAgents?: CardPeak.Entities.Agent[]
}

const AgentListItems = (props: AgentListProps) => {
    return (
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
    )
}

export default class AgentList extends React.Component<AgentListProps, AgentListState> {
    constructor(props: AgentListProps) {
        super(props);
        this.state = {
            filteredAgents: props.agents
        }
    }
    componentWillReceiveProps(nextProps: AgentListProps) {
        if (this.state.filteredAgents != nextProps.agents) {
            this.setState({ filteredAgents: nextProps.agents });
        }
    }
    handleOnSearchBarChange = (e: React.FormEvent<HTMLInputElement>) => {
        let searchString = e.currentTarget.value.toLowerCase();
        if (searchString === '') {
            this.setState({ filteredAgents: this.props.agents });
            return;
        }

        let filteredAgents = this.props.agents.filter((agent) => {
            return agent.firstName.toLowerCase().indexOf(searchString) >= 0 ||
                agent.lastName.toLowerCase().indexOf(searchString) >= 0;
        })
        this.setState({ filteredAgents });
    }
    render() {
        return (
            <div>
                <SearchBar hidden={this.props.isLoading} onSearchBarChange={this.handleOnSearchBarChange} />
                <AgentListItems
                    isLoading={this.props.isLoading}
                    agents={this.state.filteredAgents}
                    onSelectAgent={this.props.onSelectAgent} />
            </div>
        )
    }
}