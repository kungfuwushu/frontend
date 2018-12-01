import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IStoreState } from './common/types/index';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {someAttribute} from "./common/reducers";
import {SomeAttributeAction} from "./common/actions";
import AppNavBar from './navigation/App.Bar';


import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    }
})

const store = createStore<IStoreState, SomeAttributeAction, any, any>(someAttribute, {
    someAttribute: 1
});

ReactDOM.render(

    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <AppNavBar />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();