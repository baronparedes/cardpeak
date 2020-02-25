import * as React from 'react';
import {
    MenuItem,
    Nav,
    Navbar,
    NavbarBrand,
    NavDropdown,
    NavItem
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import PayoutBadgeContainer from './PayoutBadgeContainer';

interface RenderNavDropdownProps {
    id: string;
    root: NavProps;
    navs: NavProps[];
}

interface NavProps {
    text?: string;
    fa?: string;
    exact?: boolean;
    to?: string;
    addOn?: React.ReactNode;
    eventKey?: number;
    divider?: boolean;
}

const NavLinkText = (props: NavProps) => {
    return (
        <span>
            <i className={'fa fa-nav ' + props.fa}></i>
            {props.text}
            {props.addOn}
        </span>
    );
};

export class NavigationBar extends React.Component<{}, undefined> {
    getMetricsNavs(): RenderNavDropdownProps {
        const id = 'metrics-nav-dropdown';
        const root: NavProps = {
            to: '/metrics',
            text: 'Metrics',
            fa: 'fa-bar-chart'
        };
        const navs: NavProps[] = [
            {
                text: 'Agents',
                fa: 'fa-user',
                exact: true,
                to: '/metrics/agents'
            },
            {
                text: 'Agent Rankings',
                fa: 'fa-star',
                exact: true,
                to: '/metrics/agents/rankings'
            },
            {
                text: 'Agent Performance',
                fa: 'fa-line-chart',
                exact: true,
                to: '/metrics/agents/performance'
            },
            {
                text: 'Agent Threshold',
                fa: 'fa-area-chart',
                exact: true,
                to: '/metrics/agents/threshold'
            },
            { divider: true },
            {
                text: 'Daily Disbursement',
                fa: 'fa-exchange',
                exact: true,
                to: '/metrics/agents/disbursement'
            },
            { divider: true },
            {
                text: 'Bank Amount Distribution',
                fa: 'fa-pie-chart',
                exact: true,
                to: '/metrics/banks/amountdistribution'
            }
        ];

        return {
            id,
            root,
            navs
        };
    }
    getAgentsNavs(): RenderNavDropdownProps {
        const id = 'agent-nav-dropdown';
        const root: NavProps = {
            to: '/agents',
            text: 'Agents',
            fa: 'fa-user',
            addOn: <PayoutBadgeContainer />
        };
        const navs: NavProps[] = [
            {
                text: 'Agent Dashboard',
                fa: 'fa-tachometer',
                exact: true,
                to: '/agents'
            },
            { divider: true },
            {
                text: 'Payout',
                fa: 'fa-money',
                exact: true,
                to: '/agents/payout',
                addOn: <PayoutBadgeContainer autoRefresh />
            },
            { divider: true },
            {
                text: 'Manage Savings',
                fa: 'fa-bank',
                exact: true,
                to: '/agents/savings'
            },
            { divider: true },
            {
                text: 'Create',
                fa: 'fa-user-plus',
                exact: true,
                to: '/agents/create'
            },
            {
                text: 'Update',
                fa: 'fa-pencil',
                exact: true,
                to: '/agents/update'
            }
        ];

        return {
            id,
            root,
            navs
        };
    }
    getTeamsNavs(): RenderNavDropdownProps {
        const id = 'team-nav-dropdown';
        const root: NavProps = {
            to: '/teams',
            text: 'Teams',
            fa: 'fa-users'
        };
        const navs: NavProps[] = [
            {
                text: 'Team Dashboard',
                fa: 'fa-tachometer',
                exact: true,
                to: '/teams'
            },
            { divider: true },
            {
                text: 'Manage Teams',
                fa: 'fa-users',
                exact: true,
                to: '/teams/manage'
            }
        ];

        return {
            id,
            root,
            navs
        };
    }
    getTransactionsNavs(): RenderNavDropdownProps {
        const id = 'transactions-nav-dropdown';
        const root: NavProps = {
            to: '/transactions',
            text: 'Transactions',
            fa: 'fa-upload'
        };
        const navs: NavProps[] = [
            {
                text: 'Batch Upload',
                fa: 'fa-table',
                exact: true,
                to: '/transactions/upload'
            },
            {
                text: 'Manage Uploads',
                fa: 'fa-tasks',
                exact: true,
                to: '/transactions/batch'
            },
            {
                text: 'Configure Uploads',
                fa: 'fa-wrench',
                exact: true,
                to: '/transactions/upload/config'
            },
            { divider: true },
            {
                text: 'Find Transactions',
                fa: 'fa-search',
                exact: true,
                to: '/transactions/history'
            }
        ];

        return {
            id,
            root,
            navs
        };
    }
    getSettingsNavs(): RenderNavDropdownProps {
        const id = 'settings-nav-dropdown';
        const root: NavProps = {
            to: '/settings',
            text: 'Settings',
            fa: 'fa-upload'
        };
        const navs: NavProps[] = [
            {
                text: 'References',
                fa: 'fa-file-code-o',
                exact: true,
                to: '/settings'
            },
            {
                text: 'Default Rates',
                fa: 'fa-sliders',
                exact: true,
                to: '/settings/rates'
            }
        ];

        return {
            id,
            root,
            navs
        };
    }
    renderNavDropdown(props: RenderNavDropdownProps) {
        let i = 0;
        return (
            <LinkContainer
                to={props.root.to}
                onClick={e => e.preventDefault()}>
                <NavDropdown
                    title={
                        <span>
                            <NavLinkText
                                text={props.root.text}
                                fa={props.root.fa}
                            />
                            {props.root.addOn}
                        </span>
                    }
                    id={props.id}>
                    {props.navs.map(nav => {
                        i++;
                        if (nav.divider) {
                            return <MenuItem divider key={i} />;
                        }
                        return (
                            <LinkContainer
                                exact={nav.exact}
                                to={nav.to}
                                key={i}>
                                <MenuItem>
                                    <NavLinkText {...nav} />
                                </MenuItem>
                            </LinkContainer>
                        );
                    })}
                </NavDropdown>
            </LinkContainer>
        );
    }
    render() {
        return (
            <Navbar
                collapseOnSelect
                id="main-nav"
                role="navigation"
                staticTop>
                <Navbar.Header>
                    <NavbarBrand>CARDPEAK</NavbarBrand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer exact to="/">
                            <NavItem>
                                <NavLinkText
                                    text="Dashboard"
                                    fa="fa-home"
                                />
                            </NavItem>
                        </LinkContainer>
                        {this.renderNavDropdown(this.getMetricsNavs())}
                        {this.renderNavDropdown(this.getTeamsNavs())}
                        {this.renderNavDropdown(this.getAgentsNavs())}
                        {this.renderNavDropdown(
                            this.getTransactionsNavs()
                        )}
                        {this.renderNavDropdown(this.getSettingsNavs())}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
