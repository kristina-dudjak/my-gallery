import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";


function ResetPasswordModal(props) {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };


  const resetPwd = async () => {
    try {
      await resetPassword(email);
      close();
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setErrorMessage("Wrong email.");
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    }
  };

  const handleClick = async () => {
    setErrorMessage("");
    setLoading(true);
    const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!pattern.test(email)) {
      setErrorMessage("You entered invalid email. Please enter valid email.");
    } else {
      await resetPwd();
    }
    setLoading(false);
  };

  const close = () => {
    props.onHide();
    setEmail("");
    setErrorMessage("");
  };

  return (

    <Modal {...props} backdrop="static" keyboard={false} size="sm">
      <Modal.Header>
        <Modal.Title>Reset password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input type="email" placeholder="Email" onChange={handleEmailChange}></input>
        <div className="text-danger mt-2">{errorMessage}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleClick} disabled={!email || loading}>Send email</Button>
        <Button variant='secondary' onClick={close} disabled={loading}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResetPasswordModal;

