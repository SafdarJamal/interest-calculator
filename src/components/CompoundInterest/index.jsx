import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { calculateCompoundInterest } from '../../utils/calculateCompoundInterest';

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 300
    }
  }
});

class CompoundInterest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      calculationPeriodType: 1,
      compoundInterval: 12,
      regularInvestment: ''
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
      compoundInterval,
      regularInvestment
    } = this.state;

    let { calculationPeriod } = this.state;
    calculationPeriod = calculationPeriod / calculationPeriodType / 1;

    calculateCompoundInterest(
      initialInvestment,
      interestRate,
      calculationPeriod,
      compoundInterval,
      regularInvestment
    );
  };

  render() {
    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType,
      compoundInterval,
      regularInvestment
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

    return (
      <Paper elevation={2}>
        <form
          onSubmit={this.handleSubmit}
          className={classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            autoFocus
            name="initialInvestment"
            label="Initial Investment"
            variant="outlined"
            type="number"
            value={initialInvestment}
            onChange={this.handleChange}
          />
          <TextField
            name="interestRate"
            label="Interest Rate (Yearly)"
            variant="outlined"
            type="number"
            value={interestRate}
            onChange={this.handleChange}
          />
          <TextField
            name="calculationPeriod"
            label="Calculation Period"
            variant="outlined"
            type="number"
            value={calculationPeriod}
            onChange={this.handleChange}
          />
          <TextField
            name="calculationPeriodType"
            label="Calculation Period Type"
            variant="outlined"
            select
            value={calculationPeriodType}
            onChange={this.handleChange}
          >
            <MenuItem value={365}>Days</MenuItem>
            <MenuItem value={12}>Months</MenuItem>
            <MenuItem value={1}>Years</MenuItem>
          </TextField>
          <TextField
            name="compoundInterval"
            label="Compound Interval"
            variant="outlined"
            select
            value={compoundInterval}
            onChange={this.handleChange}
          >
            <MenuItem value={365}>Daily</MenuItem>
            <MenuItem value={12}>Monthly</MenuItem>
            <MenuItem value={4}>Quarterly</MenuItem>
            <MenuItem value={2}>Half Yearly</MenuItem>
            <MenuItem value={1}>Yearly</MenuItem>
          </TextField>
          <TextField
            name="regularInvestment"
            label="Regular Monthly Investment (Optional)"
            variant="outlined"
            type="number"
            value={regularInvestment}
            onChange={this.handleChange}
          />
          <br />
          {isFormFilled ? (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Calculate
            </Button>
          ) : (
            <Button disabled variant="contained" size="large">
              Calculate
            </Button>
          )}
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(CompoundInterest);
