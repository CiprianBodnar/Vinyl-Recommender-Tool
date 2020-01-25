import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

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

                        {/*Urmatorul link va fi decat dupa logare - pus provizoriu*/}
                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/profile">Profile</NavLink>

                        <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/about">About</NavLink>
                    </Nav>

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                    <NavLink className="d-inline p-2 bg-dark text-white"
                        to="/signup">Sign Up</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}
