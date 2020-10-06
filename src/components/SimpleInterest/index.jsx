import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { calculateSimpleInterest } from '../../utils';
import Result from '../Result';

const styles = theme => ({
  root: {
    padding: 16
  },
  input: {
    width: '100%'
  },
  calcButton: {
    width: '100%',
    marginBottom: 16,
    [theme.breakpoints.up('sm')]: {
      width: '48%',
      marginRight: 11,
      marginBottom: 0
    }
  },
  resetButton: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '48%',
      marginLeft: 11
    }
  },
  buttonProgress: {
    position: 'absolute',
    marginTop: 8,
    marginLeft: -150
  }
});

class SimpleInterest extends Component {
  constructor(props) {
    super(props);

    const data = JSON.parse(localStorage.getItem('simpleInterest'));

    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      resultData
    } = data || {
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      calculationPeriodType: 1,
      resultData: [
        { name: 'Initial Investment', value: 0 },
        { name: 'Interest Earned', value: 0 },
        { name: 'Total', value: 0 }
      ]
    };

    this.state = {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      isCalculating: false,
      isResetting: false,
      resultData
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ isCalculating: true });

    setTimeout(() => {
      const {
        initialInvestment,
        interestRate,
        calculationPeriodType,
        resultData
      } = this.state;

      let { calculationPeriod } = this.state;
      calculationPeriod = calculationPeriod / calculationPeriodType / 1;

      const { P, I, A } = calculateSimpleInterest(
        initialInvestment,
        interestRate,
        calculationPeriod
      );

      resultData[0].value = P;
      resultData[1].value = I;
      resultData[2].value = A;

      this.setState({ isCalculating: false, resultData });

      this.props.scrollBottom();
    }, 2000);
  };

  handleReset = e => {
    this.setState({ isResetting: true });

    setTimeout(() => {
      this.setState({
        initialInvestment: '',
        interestRate: '',
        calculationPeriod: '',
        calculationPeriodType: 1,
        isCalculating: false,
        isResetting: false,
        resultData: [
          { name: 'Initial Investment', value: 0 },
          { name: 'Interest Earned', value: 0 },
          { name: 'Total', value: 0 }
        ]
      });

      this.props.scrollTop();
    }, 2000);
  };

  render() {
    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      isCalculating,
      isResetting,
      resultData
    } = this.state;

    const { classes } = this.props;
    let isFormFilled = false;

    if (initialInvestment && interestRate && calculationPeriod) {
      isFormFilled = true;
    }

    localStorage.setItem(
      'simpleInterest',
      JSON.stringify({
        initialInvestment,
        interestRate,
        calculationPeriod,
        calculationPeriodType,
        resultData
      })
    );

    return (
      <main role="main">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
          onReset={this.handleReset}
        >
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                id="initial-investment"
                name="initialInvestment"
                label="Initial Investment"
                variant="outlined"
                type="number"
                value={initialInvestment}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                id="interest-rate"
                name="interestRate"
                label="Yearly Interest Rate (%)"
                variant="outlined"
                type="number"
                value={interestRate}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="calculation-period"
                name="calculationPeriod"
                label="Calculation Period"
                variant="outlined"
                type="number"
                value={calculationPeriod}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                id="calculation-period-type"
                name="calculationPeriodType"
                variant="outlined"
                select
                value={calculationPeriodType}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              >
                <MenuItem value={365}>Days</MenuItem>
                <MenuItem value={12}>Months</MenuItem>
                <MenuItem value={1}>Years</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                className={classes.calcButton}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={!isFormFilled || isCalculating}
              >
                Calculate
              </Button>
              {isCalculating && (
                <CircularProgress
                  className={classes.buttonProgress}
                  thickness={4}
                  size={28}
                />
              )}
              <Button
                className={classes.resetButton}
                type="reset"
                variant="contained"
                size="large"
                disabled={!isFormFilled || isResetting}
              >
                Reset
              </Button>
              {isResetting && (
                <CircularProgress
                  className={classes.buttonProgress}
                  thickness={4}
                  size={28}
                />
              )}
            </Grid>
          </Grid>
        </form>
        <Result resultData={resultData} />
      </main>
    );
  }
}

export default withStyles(styles)(SimpleInterest);
