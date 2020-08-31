import React, { Component } from 'react'
import { Spinner } from 'react-bootstrap'
import Router from '@/components/Router'
import { getUserInformation } from '@/services/authentication'

class App extends Component {
    state = { checked: false }

    componentDidMount() {
        getUserInformation().finally(() => this.setState({ checked: true }))
    }

    render() {
        const { checked } = this.state

        return checked ? <Router /> : <Spinner animation="border" variant="primary" />
    }
}

export default App
