import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { calculateCompoundInterest } from '../../utils';
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

class CompoundInterest extends Component {
  constructor(props) {
    super(props);

    const data = JSON.parse(localStorage.getItem('compoundInterest'));

    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      compoundInterval,
      regularInvestment,
      resultData
    } = data || {
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      calculationPeriodType: 1,
      compoundInterval: 12,
      regularInvestment: '',
      resultData: [
        { name: 'Initial Investment', value: 0 },
        { name: 'Regular Investment', value: 0 },
        { name: 'Interest Earned', value: 0 },
        { name: 'Total', value: 0 }
      ]
    };

    this.state = {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      compoundInterval,
      regularInvestment,
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
        compoundInterval,
        regularInvestment,
        resultData
      } = this.state;

      let { calculationPeriod } = this.state;
      calculationPeriod = calculationPeriod / calculationPeriodType / 1;

      const { P, PMT, I, A } = calculateCompoundInterest(
        initialInvestment,
        interestRate,
        calculationPeriod,
        compoundInterval,
        regularInvestment
      );

      resultData[0].value = P;
      resultData[1].value = PMT;
      resultData[2].value = I;
      resultData[3].value = A;

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
        compoundInterval: 12,
        regularInvestment: '',
        isCalculating: false,
        isResetting: false,
        resultData: [
          { name: 'Initial Investment', value: 0 },
          { name: 'Regular Investment', value: 0 },
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
      compoundInterval,
      regularInvestment,
      isCalculating,
      isResetting,
      resultData
    } = this.state;

    const { classes } = this.props;
    let isFormFilled = false;

    if (
      initialInvestment &&
      interestRate &&
      calculationPeriod &&
      compoundInterval
    ) {
      isFormFilled = true;
    }

    localStorage.setItem(
      'compoundInterest',
      JSON.stringify({
        initialInvestment,
        interestRate,
        calculationPeriod,
        calculationPeriodType,
        compoundInterval,
        regularInvestment,
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
              <TextField
                className={classes.input}
                id="compound-interval"
                name="compoundInterval"
                label="Compound Interval"
                variant="outlined"
                select
                value={compoundInterval}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              >
                <MenuItem value={365}>Daily</MenuItem>
                <MenuItem value={12}>Monthly</MenuItem>
                <MenuItem value={4}>Quarterly</MenuItem>
                <MenuItem value={2}>Half Yearly</MenuItem>
                <MenuItem value={1}>Yearly</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                id="regular-investment"
                name="regularInvestment"
                label="Regular Monthly Investment (Optional)"
                variant="outlined"
                type="number"
                value={regularInvestment}
                onChange={this.handleChange}
                disabled={isCalculating || isResetting}
              />
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

export default withStyles(styles)(CompoundInterest);
