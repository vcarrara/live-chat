import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import { logout } from '@/services/authentication'

class Logout extends Component {
    componentWillUnmount() {
        logout().then(() => {
            console.log('User successfully logged out.')
        })
    }

    render() {
        const { redirect } = queryString.parse(this.props.location.search)
        return <Redirect to={redirect || '/'} />
    }
}

export default withRouter(Logout)
