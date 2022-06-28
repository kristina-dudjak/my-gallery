import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";


function Registration() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { signup, logout } = useAuth();
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const register = async () => {
        setErrorMessage("");
        const signUpError = await signup(email, password);
        if (signUpError === "auth/email-already-in-use") {
            setErrorMessage("Email is already in use.");
        } else if (signUpError != null) {
            setErrorMessage("Something went wrong. Please try again later.");
        } else {
            await logout();
            navigate("/login");
        }
    };

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        await register();
        setLoading(false);
    };

    const emailVaildation = (event) => {
        setErrorMessage("");
        const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!pattern.test(email)) {
            event.preventDefault();
            setErrorMessage("You entered invalid email. Please enter valid email.");
        }

    };

    return (
        <Container className='mt-5 d-flex justify-content-center'>

            <Form noValidate className='col-md-6 p-4 border border-secondary rounded' onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="Password (min. 6 characters)" onChange={handlePasswordChange} />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={!email || password.length < 6 || loading} onClick={emailVaildation}>
                        Register
                    </Button>
                </div>
                <div className="text-danger mt-2">{errorMessage}</div>
            </Form>
        </Container>
    );
}

export default Registration;