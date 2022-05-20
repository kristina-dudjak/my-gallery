import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
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
            <NavLink href="/mygallery" id="linkMyGallery" hidden={loggedHidden}>My Gallery</NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="/login" id="linkLogin" hidden={!loggedHidden}>Login</Nav.Link>
            <Nav.Link href="/register" id="linkRegister" hidden={!loggedHidden}>Register</Nav.Link>
            <NavDropdown id="dropdown" hidden={loggedHidden}>
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
