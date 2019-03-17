//#region 
import * as React from 'react';

import { hot } from 'react-hot-loader';
const classNames = require('classnames');
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import * as _ from 'lodash';
import {Menu, MenuItem} from '@material-ui/core';
import {Route, withRouter} from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import {styles} from './styles';
import {IApplicationProps} from '../actions/App.Actions';
import * as AppActionCreators from '../actions/App.Actions';

import {connect} from 'react-redux';

import {bindActionCreators, Dispatch} from 'redux';

import AppDrawer from './App.Drawer';
import Home from "../pages/Home";
import {TrainingsList} from "../trainings";
import {MemberDetails} from "../members";
import {FormattedMessage} from 'react-intl';
import {AccountPage} from "../pages/Account";
import {isAuthenticated} from "../state/AppState";
//import {ProfilePage} from "../pages/Profile";
//import {isAuthenticated} from "../state/AppState";


import { FormattedMessage } from 'react-intl';
import { EvaluateGroup } from "../evaluate";
import { EvaluationsList } from "../evaluations";
import { NewEvaluation } from "../evaluations";
import { RanksList } from "../ranks";
import { NewRank } from "../ranks";
//#endregion

interface IAppProps extends IApplicationProps {
    classes: any;
    theme?: any;
}

interface IState {
    anchorEl: any;
    notificationEl: any;
}

class MiniDrawer extends React.Component<IAppProps, IState> {

    public state: IState = {
        anchorEl: null,
        notificationEl: null
    };

    public componentWillMount() {
        //this.props.fetchMembers();
    }


    private handleMenu = (event: any) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    private handleMenuClose = (path?: string) => {
        this.setState({anchorEl: null});
        this.navigate(path);
    };

    public handleLogout = () => {
        this.props.logout();
        this.handleMenuClose();
    };

    private navigate = (path?: string) => {
        if (path) {
            this.props.history.push(path);
        }
    }

    public handleDrawerOpen = () => {
        this.props.openDrawer();
    };

    public handleDrawerClose = () => {
        this.props.closeDrawer();
    };

    private renderAppBar() {
        if (this.props.authentication) {
            const {classes, utility} = this.props;
            const {anchorEl} = this.state;
            const open = Boolean(anchorEl);


            return (
                <AppBar
                    position="fixed"
                    className={classNames(classes.appBar, utility.drawerOpen && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!utility.drawerOpen}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, utility.drawerOpen && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={classes.fillSpace} variant="title" color="inherit" noWrap={true}>
                            <FormattedMessage id="app.welcome"
                                              defaultMessage="Welcome to your kung fu APP"
                                              description="Welcome Message"/>
                        </Typography>
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleMenuClose.bind(this, undefined)}
                            >
                                <MenuItem onClick={this.handleMenuClose.bind(this, '/account')}>{this.props.authentication.name}</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            );
        }

        return null;
    }


    private renderAccount = () => {
        return (
            <AccountPage user={this.props.authentication} login={this.props.login} match={this.props.match}
                         location={this.props.location}/>
        );
    }

    private renderDrawer() {
        const {utility, authentication} = this.props;
        return (
            <Hidden mdDown={!utility.drawerOpen && true}>
                <AppDrawer
                    utility={utility}
                    authentication={authentication}
                    handleDrawerClose={this.handleDrawerClose}
                />
            </Hidden>
        );
    }

    public render() {
        const {classes} = this.props;



        return (
            <div className={classes.root}>
                {this.renderAppBar()}
                {this.renderDrawer()}

                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Route path='/' exact={true} component={isAuthenticated(Home as any)}/>
                    <Route path='/members' component={isAuthenticated(MemberDetails as any)}/>
                    <Route path='/trainings' component={isAuthenticated(TrainingsList as any)}/>
                    <Route path='/account' render={this.renderAccount} />
                    <Route exact path='/ranks' component={RanksList} />
                    <Route path='/new-rank' component={NewRank} />
                    <Route exact path='/evaluations' component={EvaluationsList} />
                    <Route path='/new-evaluation' component={NewEvaluation} />
                    <Route path='/evaluations/:id/evaluate-group' component={EvaluateGroup} />
                </main>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    utility: state.utility,
    authentication: state.authentication,
    users: state.users
});

const mapDispatchtoProps = (dispatch: Dispatch) =>
    bindActionCreators(_.assign({}, AppActionCreators), dispatch);

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchtoProps)(withStyles(styles as any, {withTheme: true})(MiniDrawer as any)) as any));
