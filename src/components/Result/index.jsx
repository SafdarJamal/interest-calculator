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

const Result = ({ resultData }) => {
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
        {resultData.map(i => (
          <TableRow key={i.name} hover>
            <TableCell>{i.name}</TableCell>
            <TableCell align="right">{i.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Result;
