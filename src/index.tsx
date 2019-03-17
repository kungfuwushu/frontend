import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import AppNavBar from './navigation/App.Bar';
import { store } from './store/Store';
import blue from '@material-ui/core/colors/blue';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import { IntlProvider, addLocaleData } from 'react-intl';
import './index.css';

const locale = 'fr';
// load our messages
const messages = require('./translations/locales/fr.json');
import * as fr from 'react-intl/locale-data/fr';
addLocaleData(fr);


const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    }
});


ReactDOM.render(

    <Provider store={store}>
        <IntlProvider messages={messages} locale={locale}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <AppNavBar />
            </MuiThemeProvider>
        </Router>
        </IntlProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();