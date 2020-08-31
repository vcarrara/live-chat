import React, { Component } from 'react'
import { Container, Form, Col, Button, Alert } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { login } from '@/services/authentication'

class Login extends Component {
    state = {}

    onFormSubmit = ({ username, password }) => {
        login(username, password)
            .then((res) => {
                console.log(res)
                this.props.history.push('/')
            })
            .catch((err) => {
                console.log(err)
                this.setState({ error: err.response })
            })
    }

    render() {
        const schema = yup.object({
            username: yup.string().required('Username is a mandatory field'),
            password: yup.string().required('Password is a mandatory field'),
        })

        const initialValues = {
            username: '',
            password: '',
        }

        const { error } = this.state
        // console.log(error)

        return (
            <Container className="mt-5">
                {error && (
                    <Alert variant="danger" onClose={() => this.setState({ error: undefined })} dismissible>
                        <Alert.Heading>Oops, something went wrong!</Alert.Heading>
                        <p>{error.data}</p>
                    </Alert>
                )}
                <Formik validationSchema={schema} initialValues={initialValues} onSubmit={this.onFormSubmit}>
                    {({ handleSubmit, handleChange, values, errors }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" name="username" value={values.username} onChange={handleChange} isInvalid={errors.username} />
                                    <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={values.password} onChange={handleChange} isInvalid={errors.password} />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">Log in</Button>
                        </Form>
                    )}
                </Formik>
                <hr />
                <Link to="/register">No account yet ?</Link>
            </Container>
        )
    }
}

export default withRouter(Login)
