import * as React from 'react'
import { Nav, Navbar, NavItem, NavbarHeader, NavDropdown, MenuItem, NavbarBrand } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import PayoutBadgeContainer from './PayoutBadgeContainer'

interface NavProps {
    text?: string;
    fa?: string;
    exact?: boolean;
    to?: string;
    addOn?: React.ReactNode;
}

const NavLinkText = (props: NavProps) => {
    return (
        <span>
            <i className={"fa fa-nav " + props.fa} aria-hidden="true"></i>
            {props.text}
            {props.addOn}
        </span>
    )
}

const NavItemLinkContainer = (props: NavProps) => {
    return (
        <LinkContainer exact={props.exact} to={props.to}>
            <NavItem href={props.to}>
                <NavLinkText {...props} />
            </NavItem>
        </LinkContainer>
    );
}

const MenuItemLinkContainer = (props: NavProps) => {
    return (
        <LinkContainer exact={props.exact} to={props.to}>
            <MenuItem href={props.to} >
                <NavLinkText {...props} />
            </MenuItem>
        </LinkContainer>
    );
}

export class NavigationBar extends React.Component<{}, undefined> {
    renderHeader() {
        return (
            <Navbar.Header>
                <NavbarBrand>
                    CARDPEAK
                </NavbarBrand>
                <Navbar.Toggle />
            </Navbar.Header>
        )
    }
    renderAgents() {
        return (
            <LinkContainer to="/agents" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<span>
                        <NavLinkText text="Agents" fa="fa-users" />
                        <PayoutBadgeContainer />
                    </span>}
                    id="agents-nav-dropdown">
                    <MenuItemLinkContainer exact to="/agents" text="Agent Dashboard" fa="fa-user-circle" />
                    <MenuItem divider />
                    <MenuItemLinkContainer exact to="/agents/payout" text="Payout" fa="fa-money" addOn={
                        <PayoutBadgeContainer autoRefresh />
                    } />
                    <MenuItem divider />
                    <MenuItemLinkContainer exact to="/agents/create" text="Create" fa="fa-user-plus" />
                    <MenuItemLinkContainer exact to="/agents/update" text="Update" fa="fa-pencil" />
                </NavDropdown>
            </LinkContainer>
        )
    }
    renderTransactions() {
        return (
            <LinkContainer to="/transactions" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<NavLinkText text="Transactions" fa="fa-upload" />}
                    id="settings-nav-dropdown">
                    <MenuItemLinkContainer exact to="/transactions/upload" text="Batch Upload" fa="fa-table" />
                    <MenuItemLinkContainer exact to="/transactions/batch" text="Manage Uploads" fa="fa-tasks" />
                    <MenuItemLinkContainer exact to="/transactions/upload/config" text="Configure Uploads" fa="fa-wrench" />
                    <MenuItem divider />
                    <MenuItemLinkContainer exact to="/transactions/history" text="Find Transactions" fa="fa-search" />
                </NavDropdown>
            </LinkContainer>
        )
    }
    renderSettings() {
        return (
            <LinkContainer to="/settings" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<NavLinkText text="Settings" fa="fa-cog" />}
                    id="settings-nav-dropdown">
                    <MenuItemLinkContainer exact to="/settings" text="References" fa="fa-file-code-o" />
                    <MenuItemLinkContainer exact to="/settings/rates" text="Default Rates" fa="fa-sliders" />
                </NavDropdown>
            </LinkContainer>
        )
    }
    renderMetrics() {
        return (
            <LinkContainer to="/metrics" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<NavLinkText text="Metrics" fa="fa-bar-chart" />}
                    id="metrics-nav-dropdown">
                    <MenuItemLinkContainer exact to="/metrics/agents" text="Agents" fa="fa-users" />
                    <MenuItemLinkContainer exact to="/metrics/agents/rankings" text="Agent Rankings" fa="fa-star" />
                    <MenuItemLinkContainer exact to="/metrics/agents/performance" text="Agent Performance" fa="fa-line-chart" />
                </NavDropdown>
            </LinkContainer>
        )
    }
    render() {
        return (
            <Navbar collapseOnSelect id="main-nav" role="navigation" staticTop>
                {this.renderHeader()}
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavItemLinkContainer exact to="/" text="Dashboard" fa="fa-area-chart" />
                        {this.renderMetrics()}
                        {this.renderAgents()}
                        {this.renderTransactions()}
                        {this.renderSettings()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}