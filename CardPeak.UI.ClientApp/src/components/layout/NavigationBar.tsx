import * as React from 'react'
import { Nav, Navbar, NavItem, NavbarHeader, NavDropdown, MenuItem, NavbarBrand } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const NavLinkText = (props: { text: string, fa: string }) => {
    return (
        <span>
            <i className={"fa fa-nav " + props.fa} aria-hidden="true"></i>
            {props.text}
        </span>
    )
}

const NavItemLinkContainer = (props: { text: string, fa: string, exact: boolean, to: string }) => {
    return (
        <LinkContainer exact={props.exact} to={props.to}>
            <NavItem href={props.to}>
                <NavLinkText text={props.text} fa={props.fa} />
            </NavItem>
        </LinkContainer>
    );
}

const MenuItemLinkContainer = (props: { text: string, fa: string, exact: boolean, to: string }) => {
    return (
        <LinkContainer exact={props.exact} to={props.to}>
            <MenuItem href={props.to} >
                <NavLinkText text={props.text} fa={props.fa} />
            </MenuItem>
        </LinkContainer>
    );
}

export class NavigationBar extends React.Component<{}, undefined> {
    renderHeader() {
        return (
            <Navbar.Header>
                <NavbarBrand>
                    <a href="#">CARDPEAK</a>
                </NavbarBrand>
                <Navbar.Toggle />
            </Navbar.Header>
        )
    }
    renderDashboard() {
        return (
            <NavItemLinkContainer exact to="/" text="Dashboard" fa="fa-area-chart" />
        )
    }
    renderAgents() {
        return (
            <LinkContainer to="/agents" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<NavLinkText text="Agents" fa="fa-users" />}
                    id="agents-nav-dropdown">
                    <MenuItemLinkContainer exact to="/agents" text="Agent Dashboard" fa="fa-user-circle" />
                    <MenuItem divider />
                    <MenuItemLinkContainer exact to="/agents/create" text="Create" fa="fa-user-plus" />
                    <MenuItemLinkContainer exact to="/agents/update" text="Update" fa="fa-pencil" />
                </NavDropdown>
            </LinkContainer>
        )
    }
    renderUploads() {
        return (
            <LinkContainer to="/uploads" onClick={(e) => e.preventDefault()}>
                <NavDropdown
                    title={<NavLinkText text="Uploads" fa="fa-upload" />}
                    id="settings-nav-dropdown">
                    <MenuItemLinkContainer exact to="/uploads/batch" text="New Batch" fa="fa-table" />
                    <MenuItem divider />
                    <MenuItemLinkContainer exact to="/uploads/config" text="Configure Uploads" fa="fa-wrench" />
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
                    <MenuItemLinkContainer exact to="/settings/references" text="References" fa="fa-file-code-o" />
                    <MenuItemLinkContainer exact to="/settings/rates" text="Default Rates" fa="fa-sliders" />
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
                        {this.renderDashboard()}
                        {this.renderAgents()}
                        {this.renderUploads()}
                        {this.renderSettings()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}