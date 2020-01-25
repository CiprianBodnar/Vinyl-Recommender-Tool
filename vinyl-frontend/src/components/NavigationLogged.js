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
                <Navbar.Brand href="/home" style={title}>Vinyl Recommander</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/">Home</NavLink>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/about">About</NavLink>
                    </Nav>

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink className="d-inline p-2 bg-dark text-white"
                            to="/profile">My profile</NavLink>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/signin">Library</NavDropdown.Item>
                            <NavDropdown.Item href="/">Wish List</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">Sign Out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
