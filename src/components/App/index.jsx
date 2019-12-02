import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Header from '../Header';
import TabsPanel from '../TabsPanel';
import Form from '../Form';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';
import { calculateCompoundInterest } from '../../utils/calculateCompoundInterest';

const App = () => {
  calculateSimpleInterest(100000, 10, 0.25);
  calculateCompoundInterest(100000, 10, 0.25, 12);

  return (
    <Fragment>
      <Header />
      <br />
      <br />
      <Container>
        <TabsPanel />
        <Form />
      </Container>
    </Fragment>
  );
};

export default App;
