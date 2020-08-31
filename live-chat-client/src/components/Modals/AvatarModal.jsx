import React, { Component } from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { closeModal } from '@/store/actions'
import { AVATAR_MODAL } from '@/components/modals/constants'

class AvatarModal extends Component {
    close = () => {
        this.props.dispatch(closeModal(AVATAR_MODAL))
    }

    render() {
        const { show } = this.props

        return (
            <Modal show={show} onHide={this.close}>
                <Modal.Header>
                    <Modal.Title>Pick your beautiful avatar!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="mb-4">
                        {['001-lego', '002-lego', '003-lego'].map((elt, i) => (
                            <Col key={i}>
                                <img role="button" className="img-fluid" src={`http://localhost:3001/avatars/${elt}`} alt={elt} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mb-4">
                        {['004-lego', '005-lego', '006-lego'].map((elt, i) => (
                            <Col key={i}>
                                <img role="button" className="img-fluid" src={`http://localhost:3001/avatars/${elt}`} alt={elt} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mb-4">
                        {['007-lego', '008-lego', '009-lego'].map((elt, i) => (
                            <Col key={i}>
                                <img role="button" className="img-fluid" src={`http://localhost:3001/avatars/${elt}`} alt={elt} />
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.close}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default connect((state) => ({ modals: state.modals }))(AvatarModal)
