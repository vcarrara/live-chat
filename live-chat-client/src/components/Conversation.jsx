import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container, Row, Col, Button, Spinner, Form } from 'react-bootstrap'
import io from 'socket.io-client'
import clsx from 'clsx'
import moment from 'moment'
import { Formik } from 'formik'
import { get } from '@/services/conversation'
import { api } from '@/config'

class Conversation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // input: '',
            messages: [],
            fetching: true,
        }
    }

    fetchRoom = () => {
        const { room } = this.props.match.params

        get(room)
            .then((res) => {
                console.log('data', res.data)
                let { messages } = res.data
                // messages.forEach((message) => {
                //     if (message.user === null) {
                //         message.user = { username: 'Unknown' }
                //     }
                // })
                this.setState({ messages: messages })
            })
            // .catch((e) => {
            //     if (status === 401 || status === 403) {
            //         this.props.history.push('/login')
            //         return
            //     }
            // })
            .finally(() => {
                this.setState({ fetching: false })
            })
    }

    scrollToBottom = () => {
        const { fetching } = this.state
        if (!fetching) {
            this.messagesEnd.scrollIntoView()
        }
    }

    componentDidUpdate(prevProps) {
        this.scrollToBottom()
        if (prevProps.match.params.room !== this.props.match.params.room) {
            this.fetchRoom()
        }
    }

    componentDidMount() {
        this.scrollToBottom()
        this.fetchRoom()
        this.initWebsocket()
        // const { room } = this.props.match.params
        // get(room)
        //     .then((res) => {
        //         this.setState({ status: 200 })
        //         this.setState({ messages: res.data.messages })
        //     })
        //     .catch((e) => {
        //         const { status } = e.response
        //         if (status === 401 || status === 403) {
        //             this.props.history.push('/login')
        //             return
        //         }
        //         this.setState({ status })
        //     })
        // const conversationSocketURI = 'http://localhost:3001/conversation'
        // this.socket = io(conversationSocketURI)
        // fetch(`http://localhost:3001/api/conversation/${room}`)
        //     .then((x) => (x.ok ? x.json() : Promise.reject(x)))
        //     .then((data) => {
        //         this.setState({ status: 200 })
        //         // this.initWebsocket()
        //     })
        //     .catch((e) => {
        //         if (e.status === 401) {
        //             this.props.history.push('/login')
        //             return
        //         }
        //         this.setState({ status: e.status })
        //     })
    }

    initWebsocket = () => {
        const { socket } = this.props
        socket.on('new-message', (room, message) => {
            console.log('new message', room, message)
            if (room === this.props.match.params.room) {
                this.setState({ messages: [...this.state.messages, message] })
            }
        })

        // --------------------------

        // const { room } = this.props.match.params
        // const { token } = this.props.user
        // const URI = `${api}/conversation`
        // console.log(URI)
        // this.socket = io(URI, { query: { token } })

        // this.socket.on('connect', () => {
        //     console.log(`[live-chat] Web socket connected to ${URI}`)
        // })

        // this.socket.emit('join_room', room)
        // this.socket.on('new_message', (message) => {
        //     console.log('message', message)
        //     this.setState({ messages: [...this.state.messages, message] })
        // })

        // --------------------------

        // this.socket.emit('join room', room)

        // this.socket.on('send message', (data) => {
        //     console.log('New message received : ', data)
        //     const message = {
        //         text: data,
        //     }
        //     this.setState({ messages: [...this.state.messages, message] })
        // })

        // this.socket.on('new-message', (data) => {
        //     const message = {
        //         text: data,
        //     }
        //     this.setState({ messages: [...this.state.messages, message] })
        // })
    }

    // handleClick = () => {
    //     const { room } = this.props.match.params
    //     const { input } = this.state
    //     this.setState({ input: '' })
    //     this.socket.emit('send message', room, input || '')
    // }

    sendMessage = ({ message }, { resetForm }) => {
        const { socket } = this.props
        const { room } = this.props.match.params
        resetForm()        
        socket.emit('send-message', room, message)
    }

    render() {
        const { room } = this.props.match.params
        const { messages, fetching } = this.state
        // console.log(this.props)
        console.log(messages)

        if (fetching) {
            return (
                <Container>
                    <Spinner animation="border" variant="primary" />
                </Container>
            )
        }

        // if (status === 404) {
        //     return (
        //         <Container>
        //             <h1>Oops, something went wrong</h1>
        //             <hr />
        //             <h3>👻 404 Error</h3>
        //             <h5>Conversation {this.props.location.pathname.replace('/conversation/', '')} not found</h5>
        //         </Container>
        //     )
        // }

        return (
            <Container className="d-flex flex-column flex-grow-1" style={{ height: 0 }}>
                <h1>Welcome in room {room}!</h1>
                <div className="d-flex flex-grow-1" style={{ minHeight: 0 }}>
                    <div className="flex-grow-1 overflow-auto hide-bar">
                        {messages.map((message, idx) => {
                            const { username } = this.props.user
                            return (
                                <div className="mb-4 d-flex flex-column" key={idx}>
                                    <div className={clsx('Message', message.user.username === username ? 'mine mr-0 ml-auto' : 'mr-auto ml-0')}>
                                        {message.text}
                                    </div>
                                    <small className={clsx(message.user.username === username ? 'ml-auto' : 'mr-auto')}>
                                        {message.user.username}, {moment(message.date).fromNow()}
                                    </small>
                                </div>
                            )
                        })}
                        <div
                            ref={(el) => {
                                this.messagesEnd = el
                            }}
                        />
                    </div>
                </div>
                <Formik initialValues={{ message: '' }} onSubmit={this.sendMessage}>
                    {({ handleSubmit, handleChange, values }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={10}>
                                    <Form.Control
                                        type="text"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        placeholder="An incredible message... 🚀"
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button type="submit" variant="primary" className="w-100">
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Container>
        )

        // return (
        //     <Container className="d-flex flex-column flex-grow-1" style={{ height: 0 }}>
        //         <div class="fixed-container">Fixed Container</div>
        //         <div class="content-wrapper">
        //             <div class="overflow-container">
        //                 <div class="overflow-content">
        //                     Overflow Content
        //                     <br />
        //                     <br />
        //                     For Non-Chrome browsers (Firefox, Safari, etc):
        //                     <br />
        //                     Without <code>min-height:0px;</code> on the content-wrapper, this content will not scroll but instead will expand to its full
        //                     height.
        //                     <br />
        //                     <br />
        //                     Note that the setup of the main-container here is important too. If its not
        //                     <code>position:absolute; height:100%; flex-direction:column;</code>
        //                     or
        //                     <code>height:100vh; flex-direction:column;</code>
        //                     then you may not run into this issue;
        //                 </div>
        //             </div>
        //         </div>
        //     </Container>
        // )

        return (
            <Container className="h-100 pt-5 pb-5 d-flex flex-column">
                <h1>Welcome in room {room}!</h1>
                <div style={{ display: 'flex', flex: '1', minHeight: '0px' }}>
                    <div className="Messages" style={{ flex: '1', overflow: 'auto' }}>
                        <div>
                            {messages.map((message, idx) => {
                                const { username } = this.props.user
                                // console.log(message)
                                return (
                                    <div className="MessageWrapper" key={idx}>
                                        <div className={clsx('Message', message.user.username === username && 'mine')}>{message.text}</div>
                                        <small className={clsx('username', message.user.username === username && 'mine')}>
                                            {message.user.username}, {moment(message.date).fromNow()}
                                        </small>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Formik initialValues={{ message: '' }} onSubmit={this.sendMessage}>
                    {({ handleSubmit, handleChange, values }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={10}>
                                    <Form.Control
                                        type="text"
                                        name="message"
                                        value={values.message}
                                        onChange={handleChange}
                                        placeholder="An incredible message... 🚀"
                                    />
                                </Col>
                                <Col xs={2}>
                                    <Button type="submit" variant="primary" className="w-100">
                                        Send
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </Container>
        )
    }
}

const ConversationWithRouter = withRouter(Conversation)
export default connect((state) => ({ user: state.user, socket: state.socket }))(ConversationWithRouter)
