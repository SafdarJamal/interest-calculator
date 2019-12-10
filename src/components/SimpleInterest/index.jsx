import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';
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
  }
});

class SimpleInterest extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
  }

  handleChange = e => {
    this.setState({ [e.target.name]: Number(e.target.value) });
  };

  handleSubmit = e => {
    e.preventDefault();

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

    this.setState({ resultData });
  };

  handleReset = e => {
    this.setState({
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      calculationPeriodType: 1,
      resultData: [
        { name: 'Initial Investment', value: 0 },
        { name: 'Interest Earned', value: 0 },
        { name: 'Total', value: 0 }
      ]
    });
  };

  render() {
    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      resultData
    } = this.state;

    const { classes } = this.props;
    let isFormFilled = false;

    if (initialInvestment && interestRate && calculationPeriod) {
      isFormFilled = true;
    }

    return (
      <Fragment>
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
                autoFocus
                name="initialInvestment"
                label="Initial Investment"
                variant="outlined"
                type="number"
                value={initialInvestment}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                name="interestRate"
                label="Yearly Interest Rate (%)"
                variant="outlined"
                type="number"
                value={interestRate}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                name="calculationPeriod"
                label="Calculation Period"
                variant="outlined"
                type="number"
                value={calculationPeriod}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.input}
                name="calculationPeriodType"
                variant="outlined"
                select
                value={calculationPeriodType}
                onChange={this.handleChange}
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
                disabled={!isFormFilled}
              >
                Calculate
              </Button>
              <Button
                className={classes.resetButton}
                type="reset"
                variant="contained"
                color="secondary"
                size="large"
                disabled={!isFormFilled}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
        <Result resultData={resultData} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(SimpleInterest);
