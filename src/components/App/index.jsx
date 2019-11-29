import React, { Fragment } from 'react';
import Header from '../Header';
import Stepper from '../Stepper';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';

const App = () => {
  const { interestEarned, futureValue } = calculateSimpleInterest(
    100000,
    10,
    1
  );
  console.log(interestEarned, futureValue);

  return (
    <Fragment>
      <Header />
      <div style={{ padding: 50 }}>
        <Stepper />
      </div>
    </Fragment>
  );
};

export default App;
