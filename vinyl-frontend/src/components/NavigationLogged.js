import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav, NavDropdown} from 'react-bootstrap';

export default class Navigation extends Component{
    render(){
        const title={
            fontSize: '35px',
        };
        return(
            <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/profile/user" style={title}>Vinyl Recommander</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/profile/user">Home</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/about">About</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/newsearch">New Search</NavLink>
                    </Nav>

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavDropdown title="My profile" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile/user">Recommandations</NavDropdown.Item>
                            <NavDropdown.Item href="/home">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
