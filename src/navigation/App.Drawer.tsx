import * as React from 'react';
import { NavLink } from 'react-router-dom';

import BusinessIcon from '@material-ui/icons/BusinessCenter';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Assignment from '@material-ui/icons/Assignment';
import ListAssignment from '@material-ui/icons/List';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import Assessment from '@material-ui/icons/Assessment';
import Grade from '@material-ui/icons/Grade';
import GroupIcon from '@material-ui/icons/Group';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
const classNames = require('classnames');
import { styles } from './styles';

import { Utility, User } from "../store/state";

interface IAppDrawer {
    user?: User;
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
}

class AppDrawer extends React.Component<IAppDrawer, {}> {
    public routes = [
        { path: '/', title: 'Dashboard', icon: () => <DashboardIcon /> },
        { path: '/account', title: 'Profile', icon: () => <AccountCircleIcon /> },
        { path: '/trainings', title: 'Trainings', icon: () => <BusinessIcon /> },
        { path: '/groups', title: 'Groupes', icon: () => <GroupIcon /> },
        { path: '/programs', title: 'Programmes', icon: () => <ListAssignment /> },
        { path: '/exercices', title: 'Exercices', icon: () => <Assignment /> },
        { path: '/ranks', title: 'Grades', icon: () => <Grade /> },
        { path: '/tests', title: 'Evaluations', icon: () => <AssignmentTurnedIn /> },
        { path: '/myrank', title: 'Mon grade', icon: () => <Grade /> },
        { path: '/mytests', title: 'Mes évaluations', icon: () => <Assessment /> },
    ];

    public render(): JSX.Element {
        const { user, classes, utility } = this.props;
        return (
            <Drawer
                hidden={!user}
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !utility.drawerOpen && classes.drawerPaperClose),
                }}
                open={utility.drawerOpen}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {this.routes.map((route, index) => {
                    return (
                        <NavLink key={index} exact={true} activeClassName={classes.current} className={classes.link} to={route.path} >
                            <ListItem button={true}>
                                <ListItemIcon>
                                    {route.icon()}
                                </ListItemIcon>
                                <ListItemText primary={route.title} />
                            </ListItem>
                        </NavLink>
                    );
                })}
                <Divider />
            </Drawer>
        );
    }
}

export default withStyles(styles as any, { withTheme: true })(AppDrawer as any) as any;
