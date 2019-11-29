import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    'What is your initial investment?',
    'What do you estimate the yearly interest to be?',
    'How many years will you save?',
    'The number of times that interest is compounded per period?',
    'How much money do you plan on investing monthly?'
  ];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <Fragment>
          <TextField id="" label="Initial Investment" variant="outlined" />
        </Fragment>
      );
    case 1:
      return (
        <Fragment>
          <TextField id="" label="Interest Rate" variant="outlined" />
        </Fragment>
      );
    case 2:
      return (
        <Fragment>
          <TextField id="" label="Calculation Period" variant="outlined" />
        </Fragment>
      );
    case 3:
      return (
        <Fragment>
          <TextField id="" label="Compound Interval" variant="outlined" />
        </Fragment>
      );
    case 4:
      return (
        <Fragment>
          <TextField id="" label="Regular Investment" variant="outlined" />
        </Fragment>
      );
    default:
      return 'Unknown step';
  }
}

export default () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                {getStepContent(index)}
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </Paper>
    </div>
  );
};
