import { Button, Container, TextField } from '@material-ui/core'
import React from 'react'
import './Register.css'

function Register() {
    return (
        <div className="register">
            <Container maxWidth="sm" style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Register</h1>
                <div className="register__inputs">
                    <TextField required id="usernameInput" label="Username" type="text"/>
                    <TextField required id="passwordInput" label="Password" type="password"/>
                    <TextField required id="rePasswordInput" label="Re-enter Password" type="password"/>
                    <Button variant="outlined" color="primary" style={{marginTop: 50}}>Register</Button>
                </div>
            </Container>
        </div> 
    )
}

export default Register
