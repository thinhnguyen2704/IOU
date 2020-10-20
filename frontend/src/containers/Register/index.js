import { AccordionActions, Button, Container, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import './style.css'
import axios from '../../hoc/axios'
import {useUserStatus} from '../../hoc/UserContext/UserContext'
import {ACTIONS} from '../../hoc/UserContext/reducer'
import { Redirect, useHistory } from 'react-router-dom'

function Register() {
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");
    const [errorSign, setErrorSign] = useState(false);
    const [{user},dispatch] = useUserStatus();
    const history = useHistory();

    const signUp = async () => {
        if(retypedPassword !== password){
            setMessage("Re-typed password mismatched!")
        } else if (userName === "" || password === "" || retypedPassword === "") {
            setMessage("Please fill in the required fields!");
            setErrorSign(true);
        } 
        else {
            await axios.post('/api/user/signup',{
                userName: userName,
                password: password
            }).then((response)=>{
                dispatch({
                    type: ACTIONS.SET_USER,
                    user: response.data
                });
                setMessage("Successfully registered!");
                history.push("/");
            }).catch((error)=>{
                console.log(error.response.data.password)
                if (typeof error.response.data.userName != "undefined") {
                    setMessage(error.response.data.userName);
                } else {
                    setMessage(error.response.data.password)
                }
                
            })
        }
    }

    return (
        <div className="register">
            <Container maxWidth="sm" style={{backgroundColor: '#ffffff', padding: 50}}>
                <h1>Register</h1>
                <div className="register__inputs">
                    <TextField style={{backgroundColor: errorSign ? "#ffe6e6" : "white"}} required onChange={e=>setUserName(e.target.value)} id="usernameInput" label="Username" type="text"/>
                    <TextField style={{backgroundColor: errorSign ? "#ffe6e6" : "white"}}  required onChange={e=>setPassword(e.target.value)} id="passwordInput" label="Password" type="password"/>
                    <TextField style={{backgroundColor: errorSign ? "#ffe6e6" : "white"}}  required onChange={e=>setRetypedPassword(e.target.value)} id="rePasswordInput" label="Re-enter Password" type="password"/>
                    <p style={{color: 'red'}}>{message}</p>
                    <Button variant="outlined" onClick={signUp} color="primary" style={{marginTop: 50}}>Register</Button>
                </div>
            </Container>
        </div> 
    )
}

export default Register
