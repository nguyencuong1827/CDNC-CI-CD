import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Slider,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { API, ADDNEWCONTRACT } from '../../config';

const api = `${API}${ADDNEWCONTRACT}`;
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 150,
  },
  margin: {
    height: theme.spacing(3),
  },
  avaLarge: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  dropdown: {
    Width: 400,
  },
  chip: {
    marginRight: '2px',
    marginTop: '2px',
  },
}));

const HireFormDialog = (props) => {
  const classes = useStyles();
  const { profile, open, handleClose, setAlert } = props;
  const [hourPerWeek, setHourPerWeek] = useState(6);
  const [weekPerMonth, setWeekPerMonth] = useState(1);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [bonus, setBonus] = useState(0);
  const user = JSON.parse(localStorage.getItem('user'));
  const displaySkills = profile.skills
    ? Object.values(profile.skills).map((value) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={value.name} key={value.name} className={classes.chip} />
      ))
    : null;
  const handleBonusChange = (event) => {
    setBonus(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleHourChange = (event) => {
    setHourPerWeek(event.target.value);
  };
  const handleWeekChange = (event) => {
    setWeekPerMonth(event.target.value);
  };
  const handleConfirm = async (e) => {
    handleClose();
    try {
      e.preventDefault();
      const form = {};
      form.tutor = profile.email;
      form.student = user.email;
      form.hourlyPrice = profile.price;
      form.weeklyLimit = hourPerWeek;
      form.monthlyLimit = weekPerMonth;
      form.weeklyBonus = bonus * 1;
      form.totalHour = hourPerWeek * weekPerMonth;
      form.totalMoney = hourPerWeek * weekPerMonth * profile.price + bonus * 1;
      form.startDate = selectedDate;
      const res = await axios.post(api, form);
      const { returncode } = res.data;
      if (returncode === 1) {
        setAlert({
          type: 'success',
          message: res.data.returnmessage,
        });
      } else {
        setAlert({
          type: 'error',
          message: res.data.returnmessage,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  //   useEffect(() => {
  //     if()
  //   }, []);
  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        scroll="paper"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Hire Tutor Form</DialogTitle>
        <Divider />
        <DialogContent>
          <Typography variant="subtitle2">Info Tutor</Typography>
          <Grid container>
            <Grid item xs={3}>
              <Avatar
                alt="ava"
                src={profile.urlAvatar}
                className={classes.avaLarge}
              />
              <Typography>{profile.name}</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography>
                Email: <Chip label={profile.email} className={classes.chip} />
              </Typography>
              <Typography>
                Phone Number:{' '}
                <Chip label={profile.p_number} className={classes.chip} />
              </Typography>
              <Typography>
                Address:{' '}
                <Typography variant="overline">
                  {profile.address ? (
                    <Chip
                      label={profile.address.district}
                      className={classes.chip}
                    />
                  ) : null}
                  {profile.address ? (
                    <Chip
                      label={profile.address.province}
                      className={classes.chip}
                    />
                  ) : null}
                </Typography>
              </Typography>
              <Typography>Skills: {displaySkills}</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2">Hourly Price</Typography>
          <Grid container>
            <Grid item xs={6} className={classes.root}>
              <Slider
                name="price"
                value={profile.price || 0}
                // getAriaValueText={priceText}
                marks={[
                  {
                    value: profile.price,
                    label: `${profile.price}$`,
                  },
                ]}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>/hr</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2">Weekly Limit</Typography>
          <Grid container>
            <Grid item xs={4}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={hourPerWeek}
                  onChange={handleHourChange}
                >
                  <MenuItem value={6}>6 hrs/week</MenuItem>
                  <MenuItem value={9}>9 hrs/week</MenuItem>
                  <MenuItem value={12}>12 hrs/week</MenuItem>
                  <MenuItem value={15}>15 hrs/week</MenuItem>
                  <MenuItem value={21}>21 hrs/week</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography>= ${hourPerWeek * profile.price} max/week</Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2">Monthly Limit</Typography>
          <Grid container>
            <Grid item xs={4}>
              <FormControl>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={weekPerMonth}
                  onChange={handleWeekChange}
                >
                  <MenuItem value={1}>1 week/month</MenuItem>
                  <MenuItem value={2}>2 weeks/month</MenuItem>
                  <MenuItem value={3}>3 weeks/month</MenuItem>
                  <MenuItem value={4}>4 weeks/month</MenuItem>
                  <MenuItem value={21}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                = ${hourPerWeek * weekPerMonth * profile.price} max/month
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="subtitle2">Weekly Bonus</Typography>

          <Grid container>
            <Grid item xs={4}>
              <TextField
                type="number"
                id="bonus"
                name="bonus"
                autoComplete="bonus"
                //  error={hasError('bonus')}
                // helperText={
                //   hasError('bonus') ? formState.errors.bonus[0] : null
                // }
                onChange={handleBonusChange}
                value={bonus}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography>= ${bonus}/week</Typography>
            </Grid>
          </Grid>

          <Typography variant="subtitle2">Start Date</Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <Grid container>
            <Grid item xs={7}>
              <Typography variant="button">
                Total Hour: {hourPerWeek * weekPerMonth} hours
              </Typography>
            </Grid>
            <Grid item xs={7}>
              <Typography variant="button">
                Total Money: $
                {hourPerWeek * weekPerMonth * profile.price + bonus * 1}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default HireFormDialog;
