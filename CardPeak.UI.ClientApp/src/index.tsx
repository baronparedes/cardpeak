import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from './components/AppRouter'

import 'font-awesome/css/font-awesome.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import './styles/main.less'

ReactDOM.render(
    <AppRouter />,
    document.getElementById("root")
);
