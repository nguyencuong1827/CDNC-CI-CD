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
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import validate from 'validate.js';
import axios from 'axios';
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { API, CHANGEPASSWORD, RESETPASSWORD } from '../../config';

const api = `${API}${CHANGEPASSWORD}`;
const apiReset = `${API}${RESETPASSWORD}`;

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
}));

const schema = {
  newPassword: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6,
      maximum: 128,
    },
  },
  rePassword: {
    presence: { allowEmpty: false, message: 'is required' },
    equality: 'newPassword',
  },
};

const ChangePassword = (props) => {
  const classes = useStyles();
  const { search } = props.location;
  console.log('ad', search);
  if (search.length <= 0) {
    schema.currentPassword = {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 6,
        maximum: 128,
      },
    };
  }
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
  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
      let res = null;
      if (search.length <= 0) {
        const Authorization = `Bearer ${token}`;
        res = await axios.put(api, formState.values, {
          headers: { Authorization },
        });
      } else {
        formState.values.token = search.substring(7, search.length);
        res = await axios.put(apiReset, formState.values);
      }

      if (res.data.returncode === 1) {
        setAlert({
          type: 'success',
          message: res.data.returnmessage,
        });
        // props.history.push('/signin');
      } else {
        setAlert({ ...alert, message: res.data.returnmessage });
      }
      setFormState((formState) => ({
        ...formState,
        isLoading: !formState.isLoading,
        isValid: !formState.isValid,
      }));
    } catch (err) {
      setAlert({ ...alert, message: err.message });
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
  }, [formState.values, formState.rePassword]);

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
          <VpnKeyOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {search.length <= 0 && (
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="currentPassword"
                  label="Current password"
                  type="password"
                  id="curPassword"
                  autoComplete="current-password"
                  error={hasError('currentPassword')}
                  helperText={
                    hasError('currentPassword')
                      ? formState.errors.currentPassword[0]
                      : null
                  }
                  onChange={handleChange}
                  value={formState.values.currentPassword || ''}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="newPassword"
                label="New password"
                type="password"
                id="newPassword"
                autoComplete="current-password"
                error={hasError('newPassword')}
                helperText={
                  hasError('newPassword')
                    ? formState.errors.newPassword[0]
                    : null
                }
                onChange={handleChange}
                value={formState.values.newPassword || ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Re-type Password"
                type="password"
                id="rePassword"
                autoComplete="current-password"
                error={hasError('rePassword')}
                helperText={
                  hasError('rePassword') ? formState.errors.rePassword[0] : null
                }
                onChange={handleChange}
                value={formState.values.rePassword || ''}
              />
            </Grid>
          </Grid>
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
              <CircularProgress size={20} style={{ marginRight: '5px' }} />
            )}
            Update
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {search.length <= 0 ? (
                <Link to="/home" variant="body2">
                  Cancel
                </Link>
              ) : (
                <Link to="/signin" variant="body2">
                  Sign In
                </Link>
              )}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default ChangePassword;
