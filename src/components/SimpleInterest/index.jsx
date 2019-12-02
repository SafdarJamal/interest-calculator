import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 300
    }
  }
});

class SimpleInterestForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      calculationPeriodType: 2
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
      calculationPeriodType
    } = this.state;
    let { calculationPeriod } = this.state;

    switch (calculationPeriodType) {
      case 0:
        calculationPeriod = calculationPeriod / 365 / 1;
        break;
      case 1:
        calculationPeriod = calculationPeriod / 12 / 1;
        break;
      default:
        break;
    }

    calculateSimpleInterest(initialInvestment, interestRate, calculationPeriod);
  };

  render() {
    const {
      initialInvestment,
      interestRate,
      calculationPeriod,
      calculationPeriodType
    } = this.state;

    const { classes } = this.props;

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
            label="Yearly Interest Rate (%)"
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
            select
            value={calculationPeriodType}
            onChange={this.handleChange}
            variant="outlined"
          >
            <MenuItem value={0}>Days</MenuItem>
            <MenuItem value={1}>Months</MenuItem>
            <MenuItem value={2} selected>
              Years
            </MenuItem>
          </TextField>
          <br />
          <Button type="submit" variant="contained" color="primary">
            Calculate
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(SimpleInterestForm);
