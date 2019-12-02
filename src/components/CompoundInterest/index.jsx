import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { calculateSimpleInterest } from '../../utils/calculateSimpleInterest';
import { calculateCompoundInterest } from '../../utils/calculateCompoundInterest';

const styles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: 300
    }
  }
});

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialInvestment: '',
      interestRate: '',
      calculationPeriod: '',
      compoundInterval: '',
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
      calculationPeriod,
      compoundInterval,
      regularInvestment
    } = this.state;

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
      compoundInterval,
      regularInvestment
    } = this.state;
    console.log(this.state);

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
            name="compoundInterval"
            label="Compound Interval"
            variant="outlined"
            type="number"
            value={compoundInterval}
            onChange={this.handleChange}
          />
          <TextField
            name="regularInvestment"
            label="Regular Investment"
            variant="outlined"
            type="number"
            value={regularInvestment}
            onChange={this.handleChange}
          />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Calculate
          </Button>
        </form>
      </Paper>
    );
  }
}

export default withStyles(styles)(Form);
