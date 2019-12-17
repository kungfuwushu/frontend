import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as querystring from 'querystring';

import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { User } from '../../store/state/';
import * as api from '../../api';

import { IApplicationProps, login, setInfo } from '../../store/actions';

interface ISignInProps {
    login: (data: any) => void;
    setInfo: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
}

interface ISignInState {
    email: string;
    password: string;
    passwordConfirmation: string;
    error?: string;
}

class SignInPage extends React.Component<ISignInProps, ISignInState> {

    componentWillMount() {
      this.setState({
        email: '',
        password: '',
        passwordConfirmation: '',
        error: null
      });
    }

    private handleEmailAddressChange = (event: any) => {
        this.setState({ email: event.target.value });
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    }

    private handleLogin = () => {
        this.setState({
          ...this.state,
          error: null // remove error message
        }, () => {
          Promise.all([
              api.Auth.login(this.state.email, this.state.password),
          ]).then(([{ user, token }]) => {
              // Authentification success
              console.log("user : ", user);
              console.log("token : ", token);
              // login into app : setting user and token
              this.props.login({
                ...this.state,
                token
            });
            // store user info
            this.props.setInfo(user);
          }).catch((err) => {
            // Error handler
            console.log("err ", err);
            this.setState({
                ...this.state,
                error: "Une erreur est survenue, veuillez réessayer."
            });
          });
        });
    }

    private submitOnEnter = (e: any) => {
      // if enter is pressed
      if (e.keyCode == 13) {
        this.handleLogin();
      }
    }

    public render(): JSX.Element {
        const classes = this.props.classes;

        if (this.props.user) {
            const path: string = querystring.parse((this.props.location.search as string).substr(1)).redirect as any || '/members';
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
                            onKeyDown={this.submitOnEnter}
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
                            onKeyDown={this.submitOnEnter}
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
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: any) => dispatch(login(data)),
  setInfo: (data: any) => dispatch(setInfo(data)),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(SignInPage as any) as any);
