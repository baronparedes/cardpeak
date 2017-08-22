import * as React from 'react'
import { Nav, Navbar, NavItem, NavbarHeader, NavDropdown, MenuItem, NavbarBrand } from 'react-bootstrap'
import { Link, NavLink, Route } from 'react-router-dom'

export const NavLinkText = (props: { text: string, fa: string }) => {
    return (
        <span>
            <i className={"fa fa-nav " + props.fa} aria-hidden="true"></i>
            {props.text}
        </span>
    );
}

export class NavigationBar extends React.Component<{}, undefined> {
    render() {
        let settingsTitle = (
            <span>
                <i className="fa fa-sliders fa-nav" aria-hidden="true"></i>
                Settings
            </span>
        );

        return (
            <Navbar inverse collapseOnSelect id="main-nav" staticTop>
                <Navbar.Header>
                    <NavbarBrand>
                        <a href="#">CARDPEAK</a>
                    </NavbarBrand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        <li role="presentation">
                            <NavLink exact to="/">
                                <NavLinkText text="Dashboard" fa="fa-tachometer" />
                            </NavLink>
                        </li>
                        <li role="presentation">
                            <NavLink to="/agents">
                                <NavLinkText text="Agents" fa="fa-users" />
                            </NavLink>
                        </li>
                        <NavDropdown eventKey={3} title={<NavLinkText text="Settings" fa="fa-sliders"/>} id="basic-nav-dropdown">
                            <li role="menuitem"><NavLink exact to="/">Banks</NavLink></li>
                            <li role="menuitem"><NavLink exact to="/">Rates</NavLink></li>
                            <MenuItem divider />
                            <li role="menuitem"><NavLink exact to="/">Agent Aliases</NavLink></li>
                            <MenuItem divider />
                            <li role="menuitem"><NavLink exact to="/">Configure Upload</NavLink></li>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}