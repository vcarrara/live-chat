import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-bootstrap-typeahead/css/Typeahead.css'

import App from '@/components/App'
import store from '@/store'
import '@/style/index.scss'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
