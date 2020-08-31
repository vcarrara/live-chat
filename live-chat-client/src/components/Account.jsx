import React, { Component } from 'react'
import { Container, Button, CardGroup, Card, Row, Col, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import moment from 'moment'
import PrivateRoute from '@/components/PrivateRoute'
import { create, remove } from '@/services/conversation'
import Conversation from '@/components/Conversation'
import CreateRoomModal from '@/components/Modals/CreateRoomModal'

class Account extends Component {
    send = () => {
        create('dummy')
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e.response)
            })
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Row className="m-0 h-100" style={{ flex: '1' }}>
                    <Col sm="3" className="h-100 bg-light p-0">
                        <ListGroup>
                            {this.props.user.conversations.map((conversation) => (
                                <ListGroup.Item key={conversation.room}>
                                    <Row>
                                        <div style={{ width: '48px', marginRight: '1em' }}>
                                            <div className="circle">VC</div>
                                        </div>
                                        <Col>
                                            <Row>
                                                <Col xs="6" style={{ textAlign: 'left', paddingLeft: '0' }}>
                                                    <Link to={`/conversation/${conversation.room}`}>{conversation.room}</Link>
                                                </Col>
                                                <Col xs="6" className="d-flex align-items-center" style={{ textAlign: 'end' }}>
                                                    <small className="text-muted no-wrap mr-1">{moment(conversation.messages[0].date).fromNow()}</small>
                                                    {conversation.owner.username === this.props.user.username && (
                                                        <FaTrashAlt role="button" className="text-danger" onClick={() => remove(conversation.room)} />
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <small className="text-muted no-wrap">{`${conversation.messages[0].user.username}: ${conversation.messages[0].text}`}</small>
                                            </Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            <ListGroup.Item className="text-center">
                                {/* <div className="rounded-circle bg-success">
                                Create a room
                            </div> */}
                                <FaPlusCircle role="button" className="text-primary add-room" />
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm="9">
                        <PrivateRoute path="/account">
                            <Container className="mt-5 text-center">
                                <h3>Please select a conversation or create a new one.</h3>
                                <hr />
                                <Button variant="primary">New</Button>
                            </Container>
                        </PrivateRoute>
                        <PrivateRoute path="/conversation/:room">
                            <Conversation />
                        </PrivateRoute>
                    </Col>
                </Row>
                <CreateRoomModal />
            </>

            // <Row className="m-0 h-100 bg-primary" style={{ outline: 'thin solid red', minHeight: '100%' }}>
            //     {/* <Col xs="2" className="h-100 bg-primary">A</Col> */}
            //     {/* <Col xs="10" className="h-100 bg-primary">B</Col> */}
            // </Row>
        )
        // console.log(this.props)
        // return (
        //     <Container>
        //         <h1>Hello from your account</h1>
        //         <Button variant="primary" onClick={this.send}>
        //             New room
        //         </Button>
        //         <br />
        //         <br />
        //         <br />
        //         <br />
        //         <CardGroup>
        //             {this.props.user.conversations.map((conversation) => (
        //                 <Card key={conversation.room}>
        //                     <Card.Body>
        //                         <Card.Title>
        //                             <Link to={`/conversation/${conversation.room}`}>{conversation.room}</Link>
        //                         </Card.Title>
        //                         <hr />
        //                         <Card.Text>
        //                             <small className="text-muted">
        //                                 <strong>{conversation.lastMessage.user.username}</strong>{': '}
        //                                 {conversation.lastMessage.text}
        //                             </small>
        //                             <br />
        //                             <small className="text-muted">{moment(conversation.lastMessage.date).fromNow()}</small>
        //                         </Card.Text>
        //                     </Card.Body>
        //                 </Card>
        //             ))}
        //         </CardGroup>
        //     </Container>
        // )
    }
}

export default connect((state) => state)(Account)

// {this.props.user.conversations.map((conversation, idx) => (
//     <div key={idx} className="ConversationsListItem">
//         <Row>
//             <Col xs="4">
//                 <div className="circle">VC</div>
//             </Col>
//             <Col xs="8">{conversation.room}</Col>
//         </Row>
//         {/* <div className="circleWrapper">
//             <div className="circle">
//                 <span className="initials">VC</span>
//             </div>
//         </div> */}
//         {/* <div className="lastMessage">{conversation.room}</div> */}
//     </div>
// ))}
