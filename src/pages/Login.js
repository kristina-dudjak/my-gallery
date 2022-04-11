import React, {useState} from 'react';
import { Container, Form, Button} from 'react-bootstrap';


function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (

    <Container className='mt-5 d-flex justify-content-center'>
      
    <Form className='col-md-6 p-4 border border-secondary rounded'>
    <Form.Group className="mb-3" controlId="formEmail">
      <Form.Control type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
    </Form.Group>
  
    <Form.Group className="mb-3" controlId="formPassword">
      <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
    </Form.Group>
    <div className="d-grid gap-2">
    <Button variant="primary" type="submit" disabled={!email || password.length<8}>
      Login
    </Button>
  </div>
    <Button variant="link">Forgote password?</Button>
  </Form>
  </Container>
  );
}
export default Login;