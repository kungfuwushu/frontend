import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { Theme, withStyles, FormControl, InputLabel, Input, InputAdornment, Button, Icon, Divider } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { User } from '../../store/state/';
import * as api from '../../api';

import { IApplicationProps, login, setInfo } from '../../store/actions';

interface ILoginProps {
    login: (data: any) => void;
    setInfo: (data: any) => void;
    match?: any;
    location?: any;
    classes?: any;
    user: User;
    history?: any;
}

interface ILoginState {
    username: string;
    password: string;
    error?: string;
}

class LoginPage extends React.Component<ILoginProps, ILoginState> {

    componentWillMount() {
      this.setState({
        username: '',
        password: '',
        error: null
      });
    }

    private handleUsernameChange = (event: any) => {
        this.setState({ username: event.target.value });
    }

    private handlePasswordChange = (event: any) => {
        this.setState({ password: event.target.value });
    }

    private handleLogin = () => {
        this.setState({
          ...this.state,
          error: null // remove error message
        }, () => {

            api.Auth.login(this.state.username, this.state.password)
            .then(({ user, token }) => {
              // Authentification success
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
        const history = this.props.history;

        return (
            <div className={classes.container}>
                <Paper className={classes.paper}>
                    <h2>{'Login'}</h2>
                    <FormControl required={true} fullWidth={true} className={classes.field}>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            value={this.state.username}
                            onChange={this.handleUsernameChange}
                            onKeyDown={this.submitOnEnter}
                            id="username"
                            startAdornment={
                                <InputAdornment position="start">
                                    <Icon>account_circle</Icon>
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
                        <Button variant="contained" className={classes.button}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.handleLogin}
                            variant="contained"
                            color="primary"
                            className={classes.button}>
                            Submit
                        </Button>
                    </div>

                    <Divider className={classes.divider}/>

                    <div className={classes.buttonCenter}>
                        <Button
                            onClick={() => history.push('/signup')}
                            variant="outlined"
                            color="primary"
                            className={classes.button}>
                            Signup
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
        marginTop: theme.spacing(3),
        width: '30%',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    }),
    field: {
        marginTop: theme.spacing(3)
    },
    actions: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    }),
    button: {
        marginRight: theme.spacing(1)
    },
    buttonCenter: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    divider: {
        marginTop: 20,
        marginBottom: 30
    }
});

const mapStateToProps = (state: IApplicationProps) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (data: any) => dispatch(login(data)),
  setInfo: (data: any) => dispatch(setInfo(data)),
});

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(LoginPage as any) as any);
