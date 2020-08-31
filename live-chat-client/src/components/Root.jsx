import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Root extends Component {
    render() {
        const { token } = this.props
        return token ? <Redirect to="/account" /> : <Redirect to="/login" />
    }
}

export default connect((state) => ({ token: state.token }))(Root)
