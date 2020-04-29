import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <>
        <Navbar bg="light" expand="lg">

            <Navbar.Brand as={NavLink} to="/" activeClassName="active">Tiimi 4</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="mr-auto">
                    <NavLink to="/questions" activeClassName="active">Kysely</NavLink>
                    <NavLink  to="/results" activeClassName="active">Tulokset</NavLink>
                    <NavLink to="/addsurvey" activeClassName="active">Lisää uusi kysely</NavLink>
                    <NavLink to="/addradioquestion" activeClassName="active">Lisää kyselyyn radio-kysymyksiä</NavLink>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        </>
    )
}