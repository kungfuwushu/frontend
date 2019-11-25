import React from 'react';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

// import { classes } from './styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export interface Props {
  className?: string;
  message?: string;
  onClose?: () => void;
  variant: keyof typeof variantIcon;
};

export function ErrorSnackbar (props: Props) {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        autoHideDuration={6000}
        onClose={() => {}}
      >
        <SnackbarContent
          // className={{ ...classes.error, className }}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" /*className={classes.message}*/>
              <Icon /*className={{ ...classes.icon, ...classes.iconVariant }}*/ />
              {message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
              <CloseIcon /*className={classes.icon}*/ />
            </IconButton>,
          ]}
          {...other}
        />
    </Snackbar>

  );
}

// const useStyles2 = makeStyles((theme: Theme) => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));
