import { Theme } from "@material-ui/core";
import {isMobile} from "react-device-detect";

const drawerWidth = 240;

export const styles = (theme: Theme) => ({
    root: {
      flexGrow: 1,
      height: '100vh',
      minHeight: '100%',
      zIndex: 1,
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      width: '100%',
      backgroundColor: theme.palette.background.default,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      [theme.breakpoints.up('md')]: {
        width: `100%`,
      },
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawerPaper: {
      position: 'relative',
      top: 0,
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      })

    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: isMobile ? 0 : theme.spacing(3),
      minHeight: '100%',
      height: '100%',
      flex: '1 1 auto',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    button: {
      margin: theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
    },
    current: {
      color: 'red !important',
    },
    notifications: {
      overflowX: 'hidden'
    },
    fillSpace: {
      flex: '1 1 auto'
    }
  });
