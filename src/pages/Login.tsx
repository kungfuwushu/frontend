import * as React from 'react';
import { Redirect } from 'react-router';
import * as querystring from 'querystring';
import Cookies from 'js-cookie';

import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { User } from '../state/User';
import * as api from '../api';

import { IApplicationProps, login } from '../actions/App.Actions';
import { connect } from 'react-redux';

interface ILoginProps {
    login?: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

interface ILoginState {
    email: string;
    password: string;
}

class LoginPage extends React.Component<ILoginProps, ILoginState> {

    componentWillMount() {
      this.setState({
        email: '',
        password: ''
      });
    }

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: event.target.value })
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value })
    }

    private handleLogin = () => {
          Promise.all([
              api.Auth.login(this.state.email, this.state.password),
          ]).then(([ token ]) => {
              // Authentification success : token sent
              this.props.login(this.state); // login into app : setting user
              Cookies.set("token", 'Bearer ' + token.accessToken);
          });
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (this.props.user) {
            const path: string = querystring.
            parse((this.props.location.search as string).substr(1)).redirect as any || '/members';
            return <Redirect to={path} />
        }

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Login'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input
                            value={this.state.email}
                            onChange={this.handleEmailAddressChange}
                            id="email"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>email</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            value={this.state.password}
                            onChange={this.handlePasswordChange}
                            type="password"
                            id="password"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>lock</Icon>
                                </InputAdornment>}
                        />
                    </FormControl>
                    <div className={classes.actions}>
                        <Button variant="raised" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleLogin}
                            variant="raised"
                            color="primary"
                            className={classes.button}>
                            Submit
                        </Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

const styles = (theme: Theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center'
    },
    paper: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    }),
    field: {
        marginTop: theme.spacing.unit * 3
    },
    actions: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    }),
    button: {
        marginRight: theme.spacing.unit
    },
});

const mapStateToProps = (state: IApplicationProps) => ({
  user: state.authentication
});

const mapDispatchToProps = (dispatch: any) => ({
  login: (data: any) => dispatch(login(data))
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(LoginPage as any) as any);

// export default withStyles(styles, { withTheme: true })(LoginPage as any) as any;
