import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppRouter } from './components/AppRouter';
import { store } from './store';
import './styles/main.less';
import './img/profile-photo.png';

axios.defaults.baseURL = __API_BASE_URL__;

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>,
    document.getElementById('root')
);
