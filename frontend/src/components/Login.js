import React from 'react';
import {Container, TextField, Button} from '@material-ui/core';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    return (
        <div className="login">
            <Container maxWidth="sm" style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Login</h1>
                <div className="login__inputs">
                    <TextField required id="usernameInput" label="Username" type="text"/>
                    <TextField required id="passwordInput" label="Password" type="password"/>
                    <p>Do not have an account? <a href="/register">Register here!</a></p>
                    <Button variant="outlined" color="primary" style={{marginBottom: 10}}>Log In</Button>
                </div>
            </Container>
        </div>
    )
}

export default Login
