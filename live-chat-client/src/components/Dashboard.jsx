import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Container, Button } from 'react-bootstrap'
import io from 'socket.io-client'
import { api } from '@/config'
import PrivateRoute from '@/components/PrivateRoute'
import ConversationList from '@/components/ConversationList'
import Conversation from '@/components/Conversation'
import CreateRoomModal from '@/components/Modals/CreateRoomModal'
import DeleteRoomModal from '@/components/Modals/DeleteRoomModal'
import { openModal, setLastMessage } from '@/store/actions'
import { CREATE_ROOM_MODAL, DELETE_ROOM_MODAL } from '@/components/modals/constants'

class Dashboard extends Component {
    componentDidMount() {
        // const { user } = this.props
        // const rooms = user.conversations.map((conv) => conv.room)
        // for (const room of rooms) {
        //     this.socket.emit('join_room', room)
        // }
        // this.socket.on('new_message', ({ room, message }) => {
        //     this.props.dispatch(addMessage(room, message))
        //     // this.setState({ messages: [...this.state.messages, message] })
        // })
        // ------------------------------------------------
        // const { user, token } = this.props
        // const rooms = user.conversations.map((conv) => conv.room)
        // const URI = `${api}/conversation`
        // this.socket = io(URI, { query: { token } })
        // this.socket.on('connect', () => {
        //     console.log(`[live-chat] Web socket connected to ${URI}`)
        // })
        // for (const room of rooms) {
        //     this.socket.emit('join_room', room)
        // }
        // ------------------------------------------------

        const { socket, dispatch } = this.props
        socket.on('connect', () => {
            console.log('[live-chat] Websocket connection initialized.')
        })
        socket.on('new-message', (room, message) => {
            // console.log('will dispatch', room, message)
            dispatch(setLastMessage(room, message))
        })
    }

    render() {
        console.log(this.props)
        return (
            <>
                <Row className="m-0 h-100">
                    <Col sm="3" className="h-100 bg-light p-0">
                        <ConversationList />
                    </Col>
                    <Col sm="9" className="d-flex flex-column" style={{ flex: '1' }}>
                        <PrivateRoute path="/account">
                            <Container className="mt-5 text-center">
                                <h3>Please select a conversation or create a new one.</h3>
                                <hr />
                                <Button variant="primary" onClick={() => this.props.dispatch(openModal(CREATE_ROOM_MODAL))}>
                                    New
                                </Button>
                            </Container>
                        </PrivateRoute>
                        <PrivateRoute path="/conversation/:room">
                            <Conversation />
                        </PrivateRoute>
                    </Col>
                </Row>
                <CreateRoomModal show={this.props.modals[CREATE_ROOM_MODAL].visible} />
                <DeleteRoomModal show={this.props.modals[DELETE_ROOM_MODAL].visible} room={this.props.modals[DELETE_ROOM_MODAL].params.room} />
            </>
        )
    }
}

const DashboardWithRouter = withRouter(Dashboard)
export default connect((state) => ({ modals: state.modals, user: state.user, token: state.token, socket: state.socket }))(DashboardWithRouter)
