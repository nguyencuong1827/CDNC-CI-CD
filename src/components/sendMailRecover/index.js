import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from 'antd';
import {
  Avatar,
  Typography,
  Grid,
  TextField,
  Button,
  Container,
  CircularProgress,
  Card,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import axios from 'axios';
import DraftsOutlinedIcon from '@material-ui/icons/DraftsOutlined';
import { API, SENDMAILRESET } from '../../config';

const api = `${API}${SENDMAILRESET}`;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  widthForm: {
    width: '35%',
  },
  card: {
    maxWidth: 500,
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64,
    },
  },
};

const ResetPassword = (props) => {
  const classes = useStyles();
  const [formState, setFormState] = useState({
    isValid: false,
    values: { isTutor: false },
    touched: {},
    errors: {},
    isLoading: false,
  });
  const [alert, setAlert] = useState({
    type: 'error',
    message: null,
  });
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      const res = await axios.post(api, formState.values);
      if (res.data.returncode === 1) {
        // props.history.push('/changepassword');
        setAlert({
          type: 'success',
          message: res.data.returnmessage,
        });
      } else {
        setAlert({ type: 'error', message: res.data.returnmessage });
      }
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    } catch (err) {
      setAlert({ type: 'error', message: err.message });
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    }
  };

  const handleChange = (event) => {
    event.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    if (formState.values.newPassword !== formState.rePassword) {
      hasError('rePassword');
    }
    setFormState((formState) => ({
      ...formState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values, formState.rePassword, hasError]);

  return (
    <Container maxWidth="sm" className={classes.widthForm}>
      <div className={classes.paper}>
        {alert.message && (
          <div className="alert-field">
            <Alert
              message={alert.message}
              type={alert.type}
              showIcon
              closable
            />
          </div>
        )}
        <Avatar className={classes.avatar}>
          <DraftsOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Reset your password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Card className={classes.card}>
              <CardContent>
                {/* <Typography>General Information</Typography>
                <Typography>---</Typography> */}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={hasError('email')}
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  disabled={!formState.isValid}
                >
                  {formState.isLoading && (
                    <CircularProgress
                      size={20}
                      style={{ marginRight: '5px' }}
                    />
                  )}
                  Send Reset email
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/signin" variant="body2">
                      Sign In
                    </Link>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ResetPassword;
