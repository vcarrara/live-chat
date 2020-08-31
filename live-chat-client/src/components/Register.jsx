import React, { Component } from 'react'
import { Container, Form, Col, Button, Alert } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { Formik } from 'formik'
import * as yup from 'yup'
import { register } from '@/services/authentication'
// import { checkUniqueUsername } from '@/services/check'

class Register extends Component {
    state = {}

    onFormSubmit = ({ username, password, firstName, lastName }) => {
        register(username, password, firstName, lastName)
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
            username: yup
                .string()
                .required('Username is a mandatory field')
                .matches(/^[a-zA-Z0-9]+([_-]?[a-zA-Z0-9])*$/, 'Invalid username'),
            // .test(
            //     'unique-username',
            //     'This username is already taken',
            //     (value) =>
            //         new Promise((resolve) => {
            //             checkUniqueUsername(value)
            //                 .then(() => resolve(true))
            //                 .catch((e) => (e.response.status === 409 ? resolve(false) : resolve(true)))
            //         })
            // ),
            password: yup
                .string()
                .required('Password is a mandatory field')
                .matches(
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%\-*#?&])[A-Za-z\d@$!%\-*#?&]{8,}$/,
                    'Password must Contain 8 characters, one uppercase, one lowercase, one number and one special case character'
                ),
            validatePassword: yup
                .string()
                .required('Validate password is a mandatory field')
                .oneOf([yup.ref('password')], 'Passwords must match'),
            firstName: yup
                .string()
                .required('First Name is a mandatory field')
                .matches(/^[a-zA-Z-' ]{1,32}$/, 'First Name in invalid'),
            lastName: yup
                .string()
                .required('Last Name is a mandatory field')
                .matches(/^[a-zA-Z-' ]{1,32}$/, 'Last Name in invalid'),
        })

        const initialValues = {
            username: '',
            password: '',
            validatePassword: '',
            firstName: '',
            lastName: '',
        }

        const { error } = this.state

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
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" value={values.password} onChange={handleChange} isInvalid={errors.password} />
                                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Validate password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="validatePassword"
                                        value={values.validatePassword}
                                        onChange={handleChange}
                                        isInvalid={errors.validatePassword}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.validatePassword}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" name="firstName" value={values.firstName} onChange={handleChange} isInvalid={errors.firstName} />
                                    <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" name="lastName" value={values.lastName} onChange={handleChange} isInvalid={errors.lastName} />
                                    <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Button type="submit">Register</Button>
                        </Form>
                    )}
                </Formik>
                <hr />
                <Link to="/login">Already have an account ?</Link>
            </Container>
        )
    }
}

export default withRouter(Register)
