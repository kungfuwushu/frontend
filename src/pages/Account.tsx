import * as React from 'react';
import { Route, Switch } from 'react-router';
import { ProfilePage } from './Profile';
import LoginPage from './Login';

import { isAuthenticated } from '../store/state';

export class AccountPage extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (<Switch>
            <Route exact path="/account" component={isAuthenticated(ProfilePage as any)} />
            <Route path={'/account/login'} component={LoginPage as any} />
        </Switch>);
    }

}
