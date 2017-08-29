import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from './components/AppRouter'
import { Provider } from 'react-redux'
import { store } from './store'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import './styles/main.less'

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById("root")
);
