import React from 'react'
import {useState } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import SignInModal from './SignInModal'

export default function Navigation(props) {
    const [show, setShow] = useState(false)

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
            
            { props.user ?
            <>
                        <Nav className="mr-auto">
                    
                                <Nav.Link eventKey="1" as={Link} to="/start" activeClassName="active">Kysely</Nav.Link>
                                <Nav.Link eventKey="2" as={Link} to="/results" activeClassName="active">Tulokset</Nav.Link>
                                <Nav.Link eventKey="3" as={Link} to="/addsurvey" activeClassName="active">Lisää ja muokkaa kyselyitä</Nav.Link>
                                <Nav.Link eventKey="4" as={Link} to="/addquestion" activeClassName="active">Lisää kysymyksiä</Nav.Link>
                                <Nav.Link eventKey="5" as={Link} to="/editquestion" activeClassName="active">Muokkaa kysymyksiä</Nav.Link>
                        </Nav>

                        <Nav>
                            <Navbar.Text>
                                Kirjautunut: {props.user.username}
                            </Navbar.Text>
                            <NavLink to="/" activeClassName="active">
                                <Button className="login-btn" variant="outline-primary" onClick={props.handleLogout}>Kirjaudu ulos</Button>
                            </NavLink>
                        </Nav>
            </>
            :
            <>
                        <Nav className="mr-auto">
                            <Nav.Link eventKey="1" as={Link} to="/start" activeClassName="active">Kysely</Nav.Link>
                        </Nav>    
                        <Nav>    
                                <Button className="login-btn" variant="outline-primary" onClick={loginShow}>Kirjaudu sisään</Button>
                        </Nav>
            </>
            }
                </Navbar.Collapse>
            </Navbar>
            <SignInModal show={show} loginClose={loginClose} handleUser={props.handleUser} />
        </>
    )
}