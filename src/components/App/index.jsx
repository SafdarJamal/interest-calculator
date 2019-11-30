import React, { Fragment } from 'react';
import Header from '../Header';
import Stepper from '../Stepper';
// import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';
import { calculateCompoundInterest } from '../../utils/calculateCompoundInterest';

const App = () => {
  // const { interestEarned, futureValue } = calculateSimpleInterest(
  //   100000,
  //   10,
  //   1
  // );
  // console.log(interestEarned, futureValue);

  calculateCompoundInterest(100000, 10, 0.25, 12);

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
