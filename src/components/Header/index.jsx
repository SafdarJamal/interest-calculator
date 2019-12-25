import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar role="banner" className={classes.root} position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Interest Calculator
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
