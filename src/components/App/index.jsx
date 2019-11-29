import React, { Fragment } from 'react';
import Header from '../Header';
import Stepper from '../Stepper';

const App = () => {
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
