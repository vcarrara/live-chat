import React, { Component, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { Formik } from 'formik'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { closeModal } from '@/store/actions'
import { create } from '@/services/conversation'
import { checkRoomAvailable } from '@/services/check'
import { CREATE_ROOM_MODAL } from '@/components/modals/constants'

// const MembersTypeahead = () => {
//     const [isLoading, setIsLoading] = useState(false)
//     const [options, setOptions] = useState([])

//     const handleSearch = (query) => {
//         setIsLoading(true)
//         const options = ['vcarrara', 'vcarrara2', 'dummy'].map((e) => ({ id: e, username: e }))
//         setOptions(options)
//         setIsLoading(false)
//     }

//     return (
//         <AsyncTypeahead
//             id="members-selection"
//             isLoading={isLoading}
//             minLength={3}
//             onSearch={handleSearch}
//             options={options}
//             placeholder="Search for a live-chat user"
//             renderMenuItemChildren={(option, props) => <span>{option.username}</span>}
//         />
//     )
// }

class CreateRoomModal extends Component {
    createRoom = ({ roomName }) => {
        this.close()
        create(roomName).then((res) => console.log(res))
    }

    close = () => {
        this.props.dispatch(closeModal(CREATE_ROOM_MODAL))
    }

    render() {
        const { show } = this.props

        const schema = yup.object({
            roomName: yup
                .string()
                .required('Room name is a mandatory field')
                .matches(/^\w+$/, 'Room name must be only composed of letters and/or numbers')
                .test(
                    'room-available',
                    'This room is already taken',
                    (value) =>
                        new Promise((resolve) => {
                            checkRoomAvailable(value)
                                .then(() => resolve(true))
                                .catch((e) => (e.response.status === 409 ? resolve(false) : resolve(true)))
                        })
                ),
        })

        return (
            <Modal show={show} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Room creation assistant</Modal.Title>
                </Modal.Header>
                <Formik validationSchema={schema} initialValues={{ roomName: '' }} onSubmit={this.createRoom}>
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Room name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="roomName"
                                        value={values.roomName}
                                        placeholder="Whatever you want..."
                                        onChange={handleChange}
                                        isInvalid={errors.roomName}
                                        autoComplete="off"
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.roomName}</Form.Control.Feedback>
                                </Form.Group>
                                {/* <hr />
                                <Form.Group>
                                    <Form.Label>Members</Form.Label>
                                    <MembersTypeahead />
                                    <small className="text-muted">Don't worry, you will be able to change this later.</small>
                                </Form.Group> */}
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.close}>
                                    Close
                                </Button>
                                <Button type="submit" variant="primary">
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        )
    }
}

export default connect((state) => ({ modals: state.modals }))(CreateRoomModal)
