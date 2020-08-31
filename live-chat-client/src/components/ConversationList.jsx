import React, { Component } from 'react'
import { Row, Col, ListGroup, Dropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaTrashAlt, FaPlusCircle, FaEllipsisV } from 'react-icons/fa'
import moment from 'moment'
import { openModal } from '@/store/actions'
import { CREATE_ROOM_MODAL, DELETE_ROOM_MODAL } from '@/components/modals/constants'

class Conversationlist extends Component {
    render() {
        const { user } = this.props
        const ConversationToggle = React.forwardRef(({ onClick }, ref) => (
            <div ref={ref}>
                <FaEllipsisV
                    role="button"
                    onClick={(e) => {
                        e.preventDefault()
                        onClick(e)
                    }}
                />
            </div>
        ))
        return (
            <ListGroup>
                {/* For each conversation the user is in */}
                {user.conversations.map((conversation) => {
                    const lastMessage = conversation.messages[0]
                    return (
                        <ListGroup.Item key={conversation.room}>
                            <Row>
                                <div style={{ width: '48px', marginRight: '1em' }}>
                                    <img
                                        className="img-fluid"
                                        src={`http://localhost:3001/avatars/${lastMessage ? lastMessage.user.avatar : conversation.owner.avatar}`}
                                    />
                                </div>
                                <Col>
                                    <Row>
                                        <Col xs="6" style={{ textAlign: 'left', paddingLeft: '0' }}>
                                            <Link to={`/conversation/${conversation.room}`}>{conversation.room}</Link>
                                        </Col>
                                        <Col xs="6" className="d-flex align-items-center justify-content-end" style={{ textAlign: 'end' }}>
                                            {lastMessage && <small className="text-muted no-wrap mr-1">{moment(lastMessage.date).fromNow()}</small>}
                                            {conversation.owner.username === this.props.user.username && (
                                                <Dropdown>
                                                    <Dropdown.Toggle as={ConversationToggle} />
                                                    <Dropdown.Menu>                                                        
                                                        <Dropdown.Divider />
                                                        <Dropdown.Item
                                                            className="text-danger"
                                                            onClick={() => this.props.dispatch(openModal(DELETE_ROOM_MODAL, { room: conversation.room }))}
                                                        >
                                                            <div className="d-flex align-items-center">
                                                                <FaTrashAlt className="mr-2" />
                                                                <span>Delete</span>
                                                            </div>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                // <FaTrashAlt
                                                //     role="button"
                                                //     className="text-danger"
                                                //     onClick={() => this.props.dispatch(openModal('DeleteRoomModal', { room: conversation.room }))}
                                                // />
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <small className="text-muted no-wrap">
                                            {lastMessage ? `${lastMessage.user.username}: ${lastMessage.text}` : 'No messages yet.'}
                                        </small>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    )
                })}
                <ListGroup.Item className="text-center">
                    <FaPlusCircle role="button" className="text-primary add-room" onClick={() => this.props.dispatch(openModal(CREATE_ROOM_MODAL))} />
                </ListGroup.Item>
            </ListGroup>
        )
    }
}

export default connect((state) => ({ user: state.user }))(Conversationlist)
