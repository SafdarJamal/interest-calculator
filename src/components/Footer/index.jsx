import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  appBar: {
    top: 'auto',
    bottom: 0
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="overline" className={classes.title}>
            © 2019 Safdar Jamal | All Rights Reserved
          </Typography>
        </Toolbar>
      </AppBar>
    </footer>
  );
};

export default Footer;
