import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivateRoute from '@/components/PrivateRoute'
import Header from '@/components/Header'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Root from '@/components/Root'
import Dashboard from '@/components/Dashboard'
import Settings from '@/components/Settings'

const Router = () => (
    <BrowserRouter>
        <Header />
        <main>
            <Switch>
                <PrivateRoute path="/account/settings">
                    <Settings />
                </PrivateRoute>
                <PrivateRoute path={['/account', '/conversation/:room']}>
                    <Dashboard />
                </PrivateRoute>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/logout">
                    <Logout />
                </Route>
                <Route exact path="/">
                    <Root />
                </Route>
            </Switch>
        </main>
        <footer className="bg-light">Made with ❤️ by Victor Carrara.</footer>
    </BrowserRouter>
)

export default Router
