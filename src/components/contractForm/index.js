import React from 'react';
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
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 100,
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
}));

const ContractFormDialog = (props) => {
  const classes = useStyles();
  const { contract, open, handleClose } = props;
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
        <DialogTitle id="form-dialog-title">Contract Form</DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Email Tutor:{' '}
                <Chip label={contract.tutor} className={classes.chip} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Email Student:{' '}
                <Chip label={contract.student} className={classes.chip} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Hourly Price:{' '}
                <Chip label={contract.hourlyPrice} className={classes.chip} />{' '}
                Usd
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Weekly Limit:{' '}
                <Chip label={contract.weeklyLimit} className={classes.chip} />{' '}
                Hour(s)
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Monthly Limit:{' '}
                <Chip label={contract.monthlyLimit} className={classes.chip} />{' '}
                Week(s)
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Weekly Bonus:{' '}
                <Chip label={contract.weeklyBonus} className={classes.chip} />{' '}
                Usd
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Start Date:{' '}
                <Chip label={contract.startDate} className={classes.chip} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                End Date:{' '}
                <Chip label={contract.endDate} className={classes.chip} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Hire Date:{' '}
                <Chip label={contract.dayOfHire} className={classes.chip} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Total Hour:{' '}
                <Chip label={contract.totalHour} className={classes.chip} />{' '}
                Hour(s)
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="button">
                Total Money:{' '}
                <Chip label={contract.totalMoney} className={classes.chip} />{' '}
                Usd
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ContractFormDialog;
