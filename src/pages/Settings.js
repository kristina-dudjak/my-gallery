import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Container, Button } from "react-bootstrap";
import ChangePasswordModal from "../components/ChangePasswordModal";
import DeleteAccountModal from "../components/DeleteAccoutModal";



function Settings() {
  const { currentUser } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const handleCloseChangePassword = () => setShowChangePassword(false);
  const handleShowChangePassword = () => setShowChangePassword(true);

  const handleCloseDeleteAccount = () => setShowDeleteAccount(false);
  const handleShowDeleteAccount = () => setShowDeleteAccount(true);

  return (
    <Container>
      <h4>Your account</h4>
      <div>
        Email: {currentUser.email}
      </div>
      <h5 className="mt-4">Settings options</h5>
      <div className="description mt-3 w-50 p-2 border border-secondary rounded">
        <h6>Change password</h6>
        <p>Once you change your password, you cannot login with old one. Please be careful.</p>
        <Button onClick={handleShowChangePassword} size="sm">Change password</Button></div>
      <div className="description mt-3 w-50 p-2 border border-secondary rounded">
        <h6>Delete account</h6>
        <p>Once you delete your account, there is no going back. Please be certain.</p>
        <Button onClick={handleShowDeleteAccount} variant="danger" size="sm" >Delete account</Button>
      </div>
      <ChangePasswordModal
        show={showChangePassword}
        onHide={handleCloseChangePassword} />
      <DeleteAccountModal
        show={showDeleteAccount}
        onHide={handleCloseDeleteAccount} />
    </Container>

  );
}
export default Settings;