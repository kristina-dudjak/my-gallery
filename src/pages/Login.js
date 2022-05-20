import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';
import ResetPasswordModal from '../components/ResetPasswordModal';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const emailVaildation = (event) => {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!pattern.test(email)) {
      event.preventDefault();
      setErrorMessage("You entered invalid email. Please enter valid email.");
    }
  }
  const signIn = async () => {
    try {
      const res = await login(email, password);
      if (res.user.emailVerified) {
        navigate(-1);
      } else {
        await logout();
        setErrorMessage("You didn't verified your email.")
      }
    } catch (error) {
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        setErrorMessage("You entered wrong email and/or password. Check your email and/or password.");
      } else {
        setErrorMessage("Something went wrong. Please try again.")
      }
    }
  }

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    signIn();
    setLoading(false);
  }
  return (

    <Container className='mt-5 d-flex justify-content-center'>

      <Form id='login' noValidate className='col-md-6 p-4 border border-secondary rounded' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" disabled={!email || password < 6 || loading} onClick={emailVaildation}>
            Login
          </Button>
          <div className="text-danger">{errorMessage}</div>
        </div>
        <Button variant="link" onClick={handleShow}>Forgot password?</Button>
        <ResetPasswordModal
          show={show}
          onHide={handleClose} />
      </Form>
    </Container>
  );
}
export default Login;