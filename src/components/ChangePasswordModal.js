import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext"


function ChangePasswordModal(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateUsersPassword } = useAuth();

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };


  const changePwd = async () => {
    const error = await updateUsersPassword(oldPassword, newPassword);
    if (error === "auth/wrong-password") {
      setErrorMessage("Wrong password.")
    } else if (error != null) {
      setErrorMessage("Something went wrong. Please try again.")
    } else {
      close();
    }
  }

  const close = () => {
    props.onHide();
    setOldPassword("");
    setNewPassword("");
    setErrorMessage("");
  }

  return (

    <Modal {...props}>
      <Modal.Header>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="d-grid gap-2">
          <input className="mb-3" type="password" placeholder="Current password" onChange={handleOldPasswordChange}></input>
        </div>
        <div className="d-grid gap-2">
          <input className="mb-3" type="password" placeholder='New password' onChange={handleNewPasswordChange}></input>
        </div>
        <div className="text-danger">{errorMessage}</div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={changePwd} disabled={!oldPassword || newPassword.length < 6}>Change password</Button>
        <Button variant='secondary' onClick={close}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ChangePasswordModal;