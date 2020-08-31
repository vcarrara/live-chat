import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class PrivateRoute extends Component {
    render() {
        const { children, token, dispatch, ...otherProps } = this.props
        return token ? <Route {...otherProps}>{children}</Route> : <Redirect to="/" />
    }
}

export default connect((state) => ({ token: state.token }))(PrivateRoute)
