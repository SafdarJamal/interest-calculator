import React, { useState, useEffect, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import MUIButton from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
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
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
}));

const Button = ({
  children,
  className,
  type,
  variant,
  color,
  size,
  disabled
}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleClick = () => {
    if (!loading) {
      setLoading(true);
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  };

  return (
    <Fragment>
      <MUIButton
        className={className}
        type={type}
        variant={variant}
        color={color}
        size={size}
        onClick={handleClick}
        disabled={disabled}
      >
        {children}
      </MUIButton>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </Fragment>
  );
};

export default Button;
