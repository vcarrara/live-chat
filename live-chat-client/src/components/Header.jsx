import React, { Component } from 'react'
import { Navbar, Nav, Button, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        const { user, token } = this.props
        const shouldDisplayDropdown = token && ['firstName', 'lastName', 'avatar'].every((entry) => user.hasOwnProperty(entry))
        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand as={Link} to="/" href="#home">
                        live-chat
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"></Nav>
                        <Nav>
                            {shouldDisplayDropdown ? (
                                // <Button as={Link} to="/logout" variant="outline-danger">
                                //     Logout
                                // </Button>
                                <NavDropdown
                                    title={
                                        <div className="d-inline-block">
                                            <img
                                                src={`http://localhost:3001/avatars/${user.avatar}`}
                                                alt={user.avatar}
                                                className="rounded img-fluid mr-2"
                                                style={{ height: '32px' }}
                                            />
                                            {user.firstName} {user.lastName}
                                        </div>
                                    }
                                >
                                    <NavDropdown.Item as={Link} to="/account/settings">
                                        Settings
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to="/logout" className="text-danger">
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/register">
                                        Register
                                    </Nav.Link>
                                    <Button as={Link} to="/login" variant="outline-success">
                                        Login
                                    </Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}

export default connect((state) => state)(Header)
