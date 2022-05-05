import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { useNavigate  } from 'react-router-dom';
import {auth} from '../firebase.js';


function Registration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const [validated, setValidated] = useState(false);
    const handleSubmit = (event) => {
        setLoading(true);
        event.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                signOut(auth).then(() => {
                    sendEmailVerification(userCredential.user);
                  navigate("/login");
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                // ..
            });
        setLoading(false);
        setValidated(true);
    };



    return (
        <Container className='mt-5 d-flex justify-content-center'>

            <Form noValidate validated={validated} id='registration' 
            className='col-md-6 p-4 border border-secondary rounded' onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                    <Form.Control type="email" required placeholder="Email" onChange={handleEmailChange} 
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"/>
                    <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" required placeholder="Password" onChange={handlePasswordChange} />
                    <Form.Control.Feedback type="invalid">Password sholud have min 6 characters.</Form.Control.Feedback>
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={!email || !password || loading}>
                    Register
                </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Registration;