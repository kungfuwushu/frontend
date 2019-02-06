import * as React from 'react';

import FaceIcon from '@material-ui/icons/Face';
import BusinessIcon from '@material-ui/icons/BusinessCenter';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { Drawer, IconButton, Divider, Theme, ListItem, ListItemIcon, ListItemText, withStyles } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';


import { NavLink } from 'react-router-dom';
import { styles } from './styles';
import {Utility} from "../state/Utility";
const classNames = require('classnames');

interface IAppDrawer {
    utility: Utility;
    classes?: any;
    theme?: Theme;
    handleDrawerClose?: () => void;
}

class AppDrawer extends React.Component<IAppDrawer, {}> {
    public routes = [
        { path: '/', title: 'Dashboard', icon: () => <DashboardIcon /> },
        { path: '/profile', title: 'Profile', icon: () => <FaceIcon /> },
        { path: '/trainings', title: 'Trainings', icon: () => <BusinessIcon /> },
        { path: '/evaluations/1', title: 'Evaluations', icon: () => <BusinessIcon /> },
        { path: '/new-evaluation', title: 'New evaluation', icon: () => <BusinessIcon /> },
        { path: '/new-rank', title: 'New Rank', icon: () => <BusinessIcon /> },

    ]

    public render(): JSX.Element {
        const { classes, utility } = this.props;
        return (
            <Drawer
                hidden={false}
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