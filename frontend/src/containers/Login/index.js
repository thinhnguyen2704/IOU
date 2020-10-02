import React, {useState} from 'react';
import {Container, TextField, Button} from '@material-ui/core';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import axios from '../../hoc/axios';
import {useUserStatus} from '../../hoc/UserContext';
import {ACTIONS} from '../../hoc/reducer';

function Login() {

    const history = useHistory();
    const [errorSign, setErrorSign] = useState(false);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [{user},dispatch] = useUserStatus();

    const logIn = async () => {
        if (userName === "" || password === "") {
            setMessage("Please fill in the required fields!");
            setErrorSign(true);
        } 
        else {
            await axios.post('/api/user/login',{
                userName: userName,
                password: password
            }).then((response)=>{
                dispatch({
                    type: ACTIONS.SET_USER,
                    user: response.data.token
                });
                setMessage("Successfully logged In!");
                history.push("/");
            }).catch((error)=>{
                setMessage(error.response.data.password);;
            })
        }
    }

    return (
        <div className="login">
            <Container maxWidth="sm" style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Login</h1>
                <div className="login__inputs">
                    <TextField style={{backgroundColor: errorSign ? "#ffe6e6" : "white"}}  onChange={e=>setUserName(e.target.value)} required id="usernameInput" label="Username" type="text"/>
                    <TextField style={{backgroundColor: errorSign ? "#ffe6e6" : "white"}}  onChange={e=>setPassword(e.target.value)} required id="passwordInput" label="Password" type="password"/>
                    <p>{message}</p>
                    <p>Do not have an account? <a href="/register">Register here!</a></p>
                    <Button variant="outlined" color="primary" style={{marginBottom: 10}} onClick={logIn}>Log In</Button>
                </div>
            </Container>
        </div>
    )
}

export default Login
