import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TabsPanel from '../TabsPanel';
import SimpleInterest from '../SimpleInterest';
import CompoundInterest from '../CompoundInterest';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: 100,
    marginBottom: 100
  }
});

const Main = () => {
  const classes = useStyles();
  const [tabStatus, setTabStatus] = useState(0);

  return (
    <Container>
      <Paper elevation={2} className={classes.root}>
        <TabsPanel tabStatus={tabStatus} setTabStatus={setTabStatus} />
        {tabStatus === 0 && <SimpleInterest />}
        {tabStatus === 1 && <CompoundInterest />}
      </Paper>
    </Container>
  );
};

export default Main;
