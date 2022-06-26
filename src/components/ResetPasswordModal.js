import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";


function ResetPasswordModal(props) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { resetPassword } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const resetPwd = async () => {
    try {
      await resetPassword(email);
      setEmail("");
      setErrorMessage("");
      props.onHide();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("Wrong email.");
      } else {
        console.log(error.code);
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleClick = () => {
    const pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    console.log(pattern.test(email));
    if (!pattern.test(email)) {
      setErrorMessage("You entered invalid email. Please enter valid email.");
    } else {
      resetPwd();
    }
  };

  const close = () => {
    props.onHide();
    setEmail("");
    setErrorMessage("");
  };

  return (

    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Reset password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input type="email" placeholder="Email" onChange={handleEmailChange}></input>
        <div className="text-danger">{errorMessage}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClick} disabled={!email}>Send email</Button>
        <Button variant='secondary' onClick={close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;

