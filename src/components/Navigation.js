import React from 'react';
import {useState } from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    const [signedIn, setSignedIn] = useState(false);
    const [signedLabel, setSignedLabel] = useState("Kirjaudu sisään");

    const signInOut = () => {
        if (signedIn) {
            setSignedIn(false); setSignedLabel("Kirjaudu sisään");
        } else {
            setSignedIn(true); setSignedLabel("Kirjaudu ulos");
        }
    }

    return (
        <>
        <Navbar bg="light" expand="lg" collapseOnSelect>

            <Navbar.Brand as={NavLink} to="/" activeClassName="active">Tiimi 4</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="mr-auto">
                    <NavLink to="/start" activeClassName="active">Kysely</NavLink>
                    <NavLink to="/results" activeClassName="active">Tulokset</NavLink>
                    <NavLink to="/addsurvey" activeClassName="active">Lisää ja muokkaa kyselyitä</NavLink>
                    <NavLink to="/addquestion" activeClassName="active">Lisää kysymyksiä</NavLink>
                    <NavLink to="/editquestion" activeClassName="active">Muokkaa kysymyksiä</NavLink>
                </Nav>
                <Nav>
                    <Button variant="outline-primary" onClick={signInOut}>{signedLabel}</Button>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        </>
    )
}