import React from "react";
import NavBar from "react-bootstrap/Navbar";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { Nav, NavbarBrand, NavLink, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const Navigation = () => {
  const { logout, loggedHidden } = useAuth();
  return (
    <NavBar bg="light" expand="lg">
      <Container>
        <NavbarBrand href="#home">React-Bootstrap</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/mygallery" hidden={loggedHidden}>My Gallery</NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="/login" hidden={!loggedHidden}>Login</Nav.Link>
            <Nav.Link href="/register" hidden={!loggedHidden}>Register</Nav.Link>
            <NavDropdown hidden={loggedHidden}>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="/" onClick={logout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </NavbarCollapse>
      </Container>
    </NavBar>
  );
};

export default Navigation;
