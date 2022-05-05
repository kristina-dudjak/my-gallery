import React, {useState} from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import {auth} from '../firebase.js';
import { useNavigate  } from 'react-router-dom';

function Login(){
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

  const resetPassword = () => {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    console.log("Poslano");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    // ..
  });
  }
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then(authUser => {
      if (authUser.user.emailVerified) { //This will return true or false
        console.log('email is verified')
        navigate(-1);

      } else {
        console.log('email not verified')
        signOut(auth).then(() => {
          console.log(auth.currentUser);
        }
        )
      }
    }).catch((error) => {
        console.log(error);
    });
    setLoading(false);
  }
  return (

    <Container className='mt-5 d-flex justify-content-center'>
      
    <Form id='login' className='col-md-6 p-4 border border-secondary rounded' onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
    </Form.Group>
    <div className="d-grid gap-2">
    <Button variant="primary" type="submit" disabled={!email || !password || loading}>
      Login
    </Button>
  </div>
    <Button variant="link" onClick={resetPassword}>Forgot password?</Button>
  </Form>
  </Container>
  );
}
export default Login;