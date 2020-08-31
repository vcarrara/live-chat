import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { Formik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { closeModal } from '@/store/actions'
import { remove } from '@/services/conversation'
import { DELETE_ROOM_MODAL } from '@/components/modals/constants'

class DeleteRoomModal extends Component {
    deleteRoom = ({ roomName }) => {
        this.close()
        remove(roomName).then((res) => console.log(res))
    }

    close = () => {
        this.props.dispatch(closeModal(DELETE_ROOM_MODAL))
    }

    render() {
        const { show, room } = this.props

        const schema = yup.object({
            roomName: yup.string().required('Room name is a mandatory field').matches(`^${room}$`, `Field must match: ${room}`),
        })

        return (
            <Modal show={show} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Are you sure you want to delete {room}?</Modal.Title>
                </Modal.Header>
                <Formik validationSchema={schema} initialValues={{ roomName: '' }} onSubmit={this.deleteRoom}>
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Please type the name of the room you are going to delete</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="roomName"
                                        value={values.roomName}
                                        onChange={handleChange}
                                        isInvalid={errors.roomName}
                                        placeholder={room}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.roomName}</Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.close}>
                                    Close
                                </Button>
                                <Button type="submit" variant="danger">
                                    Remove
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        )
    }
}

export default connect((state) => ({ modals: state.modals }))(DeleteRoomModal)
