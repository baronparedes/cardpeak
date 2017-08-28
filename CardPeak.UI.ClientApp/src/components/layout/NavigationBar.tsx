import * as React from 'react'
import { Nav, Navbar, NavItem, NavbarHeader, NavDropdown, MenuItem, NavbarBrand } from 'react-bootstrap'
import { Link, NavLink, Route } from 'react-router-dom'

const NavLinkText = (props: { text: string, fa: string }) => {
    return (
        <span>
            <i className={"fa fa-nav " + props.fa} aria-hidden="true"></i>
            {props.text}
        </span>
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
            <li role="presentation">
                <NavLink exact to="/">
                    <NavLinkText text="Dashboard" fa="fa-area-chart" />
                </NavLink>
            </li>
        )
    }
    renderAgents() {
        return (
            <NavDropdown
                title={<NavLinkText text="Agents" fa="fa-users" />}
                id="agents-nav-dropdown">
                <li role="menuitem">
                    <NavLink exact to="/agents">
                        <NavLinkText text="Agent Dashboard" fa="fa-user-circle" />
                    </NavLink>
                </li>
                <MenuItem divider />
                <li role="menuitem">
                    <NavLink to="/agents/add">
                        <NavLinkText text="Add New Agent" fa="fa-file-o" />
                    </NavLink>
                </li>
                <li role="menuitem">
                    <NavLink to="/agents/update">
                        <NavLinkText text="Update Agent Details" fa="fa-pencil" />
                    </NavLink>
                </li>
            </NavDropdown>
        )
    }
    renderSettings() {
        return (
            <NavDropdown title={<NavLinkText text="Settings" fa="fa-cog" />} id="settings-nav-dropdown">
                <li role="menuitem">
                    <NavLink exact to="/banks">
                        <NavLinkText text="Banks" fa="fa-credit-card" />
                    </NavLink>
                </li>
                <li role="menuitem">
                    <NavLink exact to="/rates">
                        <NavLinkText text="Default Rates" fa="fa-sliders" />
                    </NavLink>
                </li>
                <MenuItem divider />
                <li role="menuitem">
                    <NavLink exact to="/config">
                        <NavLinkText text="Configure Uploads" fa="fa-wrench" />
                    </NavLink>
                </li>
            </NavDropdown>
        )
    }
    render() {
        return (
            <Navbar inverse collapseOnSelect id="main-nav" role="navigation" staticTop>
                {this.renderHeader()}
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.renderDashboard()}
                        {this.renderAgents()}
                        {this.renderSettings()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}