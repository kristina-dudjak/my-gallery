import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

function DeleteAccountModal(props) {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { deleteAccout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const deleteUser = async () => {
    setLoading(true);
    const error = await deleteAccout(password);
    if (error === "auth/wrong-password") {
      setErrorMessage("Wrong password.");
    } else if (error != null) {
      setErrorMessage("Something went wrong. Please try again later.");
    } else {
      close();
      navigate("/");
    }
    setLoading(false);
  };

  const close = () => {
    props.onHide();
    setPassword("");
    setErrorMessage("");
  };

  return (

    <Modal {...props} backdrop="static" keyboard={false}>
      <Modal.Header>
        <Modal.Title>Delete account</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>You need to enter your password for deletion confirmation</div>
        <input className="mt-3 mb-3" type="password" placeholder="Password" onChange={handlePasswordChange}></input>
        <div className="text-danger mt-2">{errorMessage}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={deleteUser} disabled={!password || loading}>Confirm</Button>
        <Button variant='secondary' onClick={close} disabled={loading}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAccountModal;

