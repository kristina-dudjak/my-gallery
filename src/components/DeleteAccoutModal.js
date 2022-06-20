import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function DeleteAccountModal(props) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { deleteAccout } = useAuth();
  const navigate = useNavigate();

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const deleteUser = async () => {
    const error = await deleteAccout(password);
    console.log(error);
    if (error === "auth/wrong-password") {
      setErrorMessage("Wrong password.")
    } else if (error != null) {
      setErrorMessage("Something went wrong. Please try again.");
    } else {
      close();
      navigate("/");
    }
  }

  const close = () => {
    props.onHide();
    setPassword("");
    setErrorMessage("");
  }

  return (

    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Delete account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        You need to enter your password for deletion confirmation
        <input className="mt-3 mb-3" type="password" placeholder="Password" onChange={handlePasswordChange}></input>
        <div className="text-danger">{errorMessage}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={deleteUser} disabled={!password}>Confirm</Button>
        <Button variant='secondary' onClick={close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAccountModal;

