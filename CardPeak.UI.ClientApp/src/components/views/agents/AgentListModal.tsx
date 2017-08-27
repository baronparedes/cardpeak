import * as React from 'react'
import { ModalPanel } from '../../layout'
import AgentList from './AgentList'

interface AgentListModalProps {
    onToggleModal: () => void;
    onAgentSelected: (agent: CardPeak.Entities.Agent) => void;
    agents: CardPeak.Entities.Agent[],
    showModal: boolean,
    isLoading?: boolean
}

const AgentListModal = (props: AgentListModalProps) => {
    return (
        <ModalPanel showModal={props.showModal} onToggleModal={props.onToggleModal} title="agents">
            <AgentList
                agents={props.agents}
                onSelectAgent={props.onAgentSelected}
                isLoading={props.isLoading} />
        </ModalPanel>
    )
}

export default AgentListModal;