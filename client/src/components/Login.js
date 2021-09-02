import React, { useEffect, useState }from 'react';
import { Form, Button } from 'react-bootstrap';
import '../App.css';
import logo from '../images/logo.png';
import axios from 'axios';
import Spinner from './Spinner';
import { Redirect } from "react-router";

const Login = () => {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const submit = (event) => {
        setIsError(false);
        setIsLoading(true);

        if (!username || !password) {
            setIsError(true);
            setIsLoading(false);
            return;
        }

        const payload = { username, password };

        axios.post('/auth/login', payload).then((response) => {
            if (response.data && response.data.status === 402) {
                alert(response.data.message)
            }

            if (response.data && response.data.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                setIsLoggedIn(true);
            }

            setName('');
            setPassword('');
            setIsLoading(false);
        }).catch(() => {});
    }

    if (isLoggedIn) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="container">
            <div className="login-container">
                <div className="logo-container">
                    <img src={logo} />
                </div>
                <Form onSubmit={submit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Control value={username}  placeholder="Enter Username..." name="username" onChange={e => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Control value={password} type="password" placeholder="Enter Password..." name="password" onChange={e => setPassword(e.target.value)}/>
                </Form.Group>

                { isError && <div className="text-error">*All fields are required</div> }
                { isLoading ? <Spinner /> : <Button className="mt-4" variant="primary" onClick={submit}>Login</Button>}
            </Form>
            </div>
        </div>
    )
}

export default Login;