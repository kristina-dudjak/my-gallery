import React, { useState } from 'react';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';


function Registration() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <Container className='mt-5 d-flex justify-content-center'>

            <Form className='col-md-6 p-4 border border-secondary rounded'>
                <Form.Group className="mb-2">
                    <Form.Control type="email" placeholder="Email" onChange={handleEmailChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="text" placeholder="First name" onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="text" placeholder="Last name" onChange={handleLastNameChange} />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="primary" type="submit" disabled={!email || !name || !lastName || password.length < 8}>
                    Register
                </Button>
                </div>
            </Form>
        </Container>
    );
}

export default Registration;