import React, { Fragment } from 'react';
import Header from '../Header';
import Main from '../Main';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';
import { calculateCompoundInterest } from '../../utils/calculateCompoundInterest';

const App = () => {
  calculateSimpleInterest(100000, 10, 0.25);
  calculateCompoundInterest(100000, 10, 0.25, 12);

  return (
    <Fragment>
      <Header />
      <Main />
    </Fragment>
  );
};

export default App;
