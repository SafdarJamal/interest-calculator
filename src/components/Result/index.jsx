import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
  tableCell: {
    fontSize: 16
  }
});

const Result = ({ resultData }) => {
  const classes = useStyles();

  const numberFormatter = new Intl.NumberFormat('en-US');

  return (
    <Table aria-label="result">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tableCell} colSpan={2} align="center">
            RESULT
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {resultData.map(i => (
          <TableRow key={i.name} hover>
            <TableCell className={classes.tableCell}>{i.name} </TableCell>
            <TableCell className={classes.tableCell} align="right">
              {numberFormatter.format(i.value)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Result;
