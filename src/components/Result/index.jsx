import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

const createData = (name, value) => {
  return { name, value };
};

const rows = [
  createData('Initial Investment', 159),
  createData('Interest Earned', 237),
  createData('Total', 262)
];

const Result = () => {
  const classes = useStyles();

  return (
    <Table className={classes.root} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} align="center">
            RESULT
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.name} hover>
            <TableCell>{row.name}</TableCell>
            <TableCell align="right">{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Result;
