import React from 'react';
import {useState } from 'react';
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

            <Navbar.Brand as={Link} to="/" activeClassName="active">Tiimi 4</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" >
            <span>
                <div id="nav-icon3">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </span>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
            
                <Nav className="mr-auto">
                    <Nav.Link eventKey="1" as={Link} to="/start" activeClassName="active">Kysely</Nav.Link>
                    <Nav.Link eventKey="2" as={Link} to="/results" activeClassName="active">Tulokset</Nav.Link>
                    <Nav.Link eventKey="3" as={Link} to="/addsurvey" activeClassName="active">Lisää ja muokkaa kyselyitä</Nav.Link>
                    <Nav.Link eventKey="4" as={Link} to="/addquestion" activeClassName="active">Lisää kysymyksiä</Nav.Link>
                    <Nav.Link eventKey="5" as={Link} to="/editquestion" activeClassName="active">Muokkaa kysymyksiä</Nav.Link>
                </Nav>
                <Nav>
                    <Button variant="outline-primary" onClick={signInOut}>{signedLabel}</Button>
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        </>
    )
}