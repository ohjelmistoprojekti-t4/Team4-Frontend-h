import React, { useState } from 'react'
import { Modal, Button, Form, Alert, FormLabel, FormGroup, FormControl } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function SignInModal(props) {

const [username, setUsername] = React.useState('')
const [password, setPassword] = React.useState('')
const [notification, setNotification] = useState(false)
const [validated, setValidated] = useState(false)
const [loginSuccess, setLoginSuccess] = useState(false)

const handleUsernameChange = (event) => {
    setUsername(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

const handleSubmit = async (event) => {
    event.preventDefault()

    const form = event.currentTarget
    if (form.checkValidity() === false) {
        event.stopPropagation()
        setValidated(true)
    } else {
        if (username === 'Administrator' && password === 'Nimda') {
            const loggedUser =  {
                username
            }
            window.localStorage.setItem('questionAppUser', JSON.stringify(loggedUser))
            setLoginSuccess(true)
            props.handleUser()
            setTimeout(() => {
                setValidated(false)
                setNotification(false)
                setLoginSuccess(false)
                props.loginClose()
              }, 1000)
        } else {
            setNotification(true)
            setTimeout(() => {
                setNotification(false)
              }, 2000)
        }
    }
}

return(
        <Modal show={props.show} onHide={props.loginClose}>
            <Modal.Header closeButton>
                <Modal.Title>Kirjaudu sisään</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                { notification ?
                    <Alert variant='danger' onClose={() => setNotification(false)} >
                        Tarkista tunnukset
                    </Alert> 
                : null }
                
                {loginSuccess ? 
                    <Alert variant="success">Kirjautuminen onnistui</Alert>
                    : 
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <FormGroup>
                            <FormLabel>Käyttäjätunnus</FormLabel>
                            <FormControl required type='text' value={username} onChange={handleUsernameChange} />
                            <Form.Control.Feedback type="invalid">
                                Käyttäjätunnus puuttuu
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormLabel>Salasana</FormLabel>
                        <FormGroup >
                            <FormControl required type='password' value={password} onChange={handlePasswordChange} />
                            <Form.Control.Feedback type="invalid">
                                Salasana puuttuu
                            </Form.Control.Feedback>
                        </FormGroup>
                        <FormGroup>
                            <Button type='submit' className='btn btn-primary mt-3'>Lähetä</Button>
                        </FormGroup>
                    </Form> 
                }
            </Modal.Body>
        </Modal>
    )
}