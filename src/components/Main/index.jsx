import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import TabsPanel from '../TabsPanel';
import SimpleInterest from '../SimpleInterest';
import CompoundInterest from '../CompoundInterest';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    marginTop: 80,
    marginBottom: 20,
    margin: 'auto',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  }
}));

const Main = () => {
  const classes = useStyles();
  const [tabStatus, setTabStatus] = useState(0);
  const top = useRef();
  const bottom = useRef();

  const scrollTop = () => {
    top.current.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollBottom = () => {
    bottom.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Container className={classes.root}>
      <div ref={top}></div>
      <Paper elevation={2} className={classes.paper}>
        <TabsPanel tabStatus={tabStatus} setTabStatus={setTabStatus} />
        {tabStatus === 0 && (
          <SimpleInterest scrollTop={scrollTop} scrollBottom={scrollBottom} />
        )}
        {tabStatus === 1 && (
          <CompoundInterest scrollTop={scrollTop} scrollBottom={scrollBottom} />
        )}
      </Paper>
      <div ref={bottom}></div>
    </Container>
  );
};

export default Main;
