import React from "react";
import NavBar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import NavbarBrand from "react-bootstrap/NavbarBrand";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import Container from "react-bootstrap/Container";
import {auth} from '../firebase.js';
import {signOut} from 'firebase/auth';



const Navigation = () => {
  return (
    <NavBar bg="light" expand="lg">
      <Container>
        <NavbarBrand href="#home">React-Bootstrap</NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/mygallery">My Gallery</NavLink>
          </Nav>
          <Nav>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/" onClick={signOut(auth)}>Log out</Nav.Link>
          </Nav>
        </NavbarCollapse>
      </Container>
    </NavBar>
  );
};

export default Navigation;
