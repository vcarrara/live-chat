import React, { Component } from 'react'
import { Container, Button, Row, Tabs, Tab, Form, Col, Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux'
import { remove } from '@/services/authentication'
import { openModal } from '@/store/actions'
import AvatarModal from '@/components/Modals/AvatarModal'
import { AVATAR_MODAL } from '@/components/modals/constants'

class Settings extends Component {
    render() {
        const style = { height: '64px', width: '64px' }
        const userAvatar = this.props.user.avatar
        return (
            <>
                <Tabs className="mt-5" defaultActiveKey="update">
                    <Tab eventKey="update" title="Update information">
                        <Container className="mt-5">
                            <Row>
                                <Form.Group as={Col} className="md-12">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control readOnly type="text" name="username" value={this.props.user.username} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="md-6">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control readOnly type="text" name="firstName" value={this.props.user.firstName} />
                                </Form.Group>
                                <Form.Group as={Col} className="md-6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control readOnly type="text" name="lastName" value={this.props.user.lastName} />
                                </Form.Group>
                            </Row>
                            <Row className="d-flex align-items-center">
                                <Form.Group as={Col}>
                                    <Form.Label className="mr-4">Avatar</Form.Label>
                                    <img
                                        role="button"
                                        onClick={() => this.props.dispatch(openModal(AVATAR_MODAL))}
                                        style={style}
                                        src={`http://localhost:3001/avatars/${userAvatar}`}
                                        alt={userAvatar}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <small className="text-muted mb-5">
                                    {'Icons made by '}
                                    <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
                                        Smashicons
                                    </a>
                                    {' from '}
                                    <a href="https://www.flaticon.com/" title="Flaticon">
                                        www.flaticon.com
                                    </a>
                                </small>
                            </Row>
                        </Container>
                    </Tab>
                    <Tab eventKey="more" title="More settings">
                        <Container className="mt-5">
                            <Row>
                                <Button variant="danger" onClick={() => remove()}>
                                    Delete my account
                                </Button>
                            </Row>
                            <Row>
                                <small className="text-muted">* this action is irreversible and can not be undone.</small>
                            </Row>
                        </Container>
                    </Tab>
                </Tabs>
                {/* <Container className="mt-5"> */}

                {/* <Row>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">Change my avatar</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="p-5">
                                <Row>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/001-lego" alt="001-lego" />
                                    </Col>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/002-lego" alt="001-lego" />
                                    </Col>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/003-lego" alt="001-lego" />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/004-lego" alt="001-lego" />
                                    </Col>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/005-lego" alt="001-lego" />
                                    </Col>
                                    <Col>
                                        <img style={style} src="http://localhost:3001/avatars/006-lego" alt="001-lego" />
                                    </Col>
                                </Row>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </Row> */}

                <AvatarModal show={this.props.modals[AVATAR_MODAL].visible} />
            </>
        )
    }
}

export default connect((state) => ({ modals: state.modals, user: state.user }))(Settings)
