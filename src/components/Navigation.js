import React from 'react';
import {useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import SignInModal from './SignInModal'

export default function Navigation() {
    const [signedIn, setSignedIn] = useState(false);
    const [signedLabel, setSignedLabel] = useState("Kirjaudu sisään");
    const [show, setShow] = useState(false)

    const signInOut = () => {
        if (signedIn) {
            setSignedIn(false)
            setSignedLabel("Kirjaudu sisään")
        } else {
            setSignedIn(true)
            setSignedLabel("Kirjaudu ulos")
        }
    }

    const loginShow = () => setShow(true)
    const loginClose = () => setShow(false)

    return (
        <>
        <Navbar bg="light" expand="lg" collapseOnSelect>

            <Navbar.Brand as={Link} to="/" activeClassName="active">Tiimi<span>4</span></Navbar.Brand>
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
                    { signedIn ?
                     <>
                    <Nav.Link eventKey="2" as={Link} to="/results" activeClassName="active">Tulokset</Nav.Link>
                    <Nav.Link eventKey="3" as={Link} to="/addsurvey" activeClassName="active">Lisää ja muokkaa kyselyitä</Nav.Link>
                    <Nav.Link eventKey="4" as={Link} to="/addquestion" activeClassName="active">Lisää kysymyksiä</Nav.Link>
                    <Nav.Link eventKey="5" as={Link} to="/editquestion" activeClassName="active">Muokkaa kysymyksiä</Nav.Link>
                    <Navbar.Text>
                         Kirjautunut: <a href="#login"> Administrator</a>
                    </Navbar.Text>
                    <NavLink to="/api/logout" activeClassName="active">
                         <Button variant="outline-primary" className="ml-2" onClick={signInOut}>{signedLabel}</Button>
                    </NavLink>
                    </>
                    :
                    <>
                        <Button variant="outline-primary" onClick={loginShow}>{signedLabel}</Button>
                    </>
                    }
                </Nav>
                
            </Navbar.Collapse>
        </Navbar>

        <SignInModal show={show} loginClose={loginClose} signInOut={signInOut} />
        
        </>
    )
}