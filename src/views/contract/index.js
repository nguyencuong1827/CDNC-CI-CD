import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Typography,
} from '@material-ui/core';
import _ from 'lodash';
import axios from 'axios';
import { Alert } from 'antd';
import dateformat from 'dateformat';
import ContractFormDialog from '../../components/contractForm';
import {
  API,
  ALLCONTRACT,
  ACCEPTCONTRACT,
  CANCELCONTRACT,
  DONECONTRACT,
  REPORTCONTRACT,
  CREATEPAYMENT,
  RETURNPAYMENT,
} from '../../config';
import 'antd/dist/antd.css';

const api = `${API}${ALLCONTRACT}`;
const apiAcceptContract = `${API}${ACCEPTCONTRACT}`;
const apiCancelContract = `${API}${CANCELCONTRACT}`;
const apiDoneContract = `${API}${DONECONTRACT}`;
const apiReportContract = `${API}${REPORTCONTRACT}`;
const apiCreatPayment = `${API}${CREATEPAYMENT}`;
const apiReturnPayment = `${API}${RETURNPAYMENT}`;

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  alert: {
    maxWidth: 300,
    margin: 'auto',
  },
});

export default function RegistrationRequest() {
  const classes = useStyles();

  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  const [registrationListing, setRegistrationListing] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [display, setDisplay] = useState(
    _.slice(registrationListing, 0, rowsPerPage)
  );
  const [reportOpen, setReportOpen] = React.useState(false);
  const [contractOpen, setContractOpen] = React.useState(false);
  const [contract, setContract] = useState({
    idContract: '',
    tutor: '',
  });
  const [reason, setReason] = useState('');
  const [alert, setAlert] = useState({
    type: 'error',
    message: null,
  });
  const handleClose = () => {
    setReportOpen(false);
    setContractOpen(false);
  };
  const fetchRegistrationListing = async () => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.get(api, {
        headers: { Authorization },
      });

      const { registration, returnCode } = res.data;
      if (returnCode === 1) {
        setRegistrationListing(registration);
        setDisplay(_.slice(registration, 0, rowsPerPage));
        setTotal(registration.length);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRegistrationListing();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setDisplay(
      _.slice(
        registrationListing,
        newPage * rowsPerPage,
        (newPage + 1) * rowsPerPage
      )
    );
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setDisplay(
      _.slice(registrationListing, 0, parseInt(event.target.value, 10))
    );
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'blue', color: 'white' }}
          />
        );
      case 'cancel':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'grey', color: 'white' }}
          />
        );
      case 'doing':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'orange', color: 'white' }}
          />
        );
      case 'done':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'green', color: 'white' }}
          />
        );
      case 'reported':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'red', color: 'white' }}
          />
        );
      case 'paying':
        return (
          <Chip
            label={status}
            style={{ backgroundColor: 'black', color: 'white' }}
          />
        );
      default:
        return null;
    }
  };

  const updateAcceptStatus = async (idContract) => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(
        apiAcceptContract,
        { id: idContract },
        {
          headers: { Authorization },
        }
      );
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === idContract) e.status = 'paying';
          return e;
        });
        setRegistrationListing(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateCancelStatus = async (idContract) => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(
        apiCancelContract,
        { id: idContract },
        {
          headers: { Authorization },
        }
      );
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === idContract) e.status = 'cancel';
          return e;
        });
        setRegistrationListing(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateDoneStatus = async (idContract) => {
    try {
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(
        apiDoneContract,
        { id: idContract },
        {
          headers: { Authorization },
        }
      );
      const { returnCode } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === idContract) {
            e.status = 'done';
            const date = new Date();
            e.endDate = dateformat(date, 'dd/mm/yyyy');
          }

          return e;
        });
        setRegistrationListing(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmButton = async () => {
    setReportOpen(false);
    try {
      contract.reason = reason;
      contract.status = 'reported';
      const Authorization = `Bearer ${token}`;

      const res = await axios.put(apiReportContract, contract, {
        headers: { Authorization },
      });
      const { returnCode, returnMessage } = res.data;
      if (returnCode === 1) {
        const temp = registrationListing.map((e) => {
          // eslint-disable-next-line no-underscore-dangle
          if (e._id === contract._id) e.status = 'reported';
          return e;
        });
        setRegistrationListing(temp);
        setAlert({
          type: 'success',
          message: returnMessage,
        });
      } else {
        setAlert({ ...alert, message: returnMessage });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelClickPayButton = async (row) => {
    try {
      const form = {};
      form._id = row._id;
      form.idContract = row.idContract;
      form.amount = row.totalMoney * 1;
      form.bankCode = '';
      form.orderDescription = 'thanh toan tien hoc phi uber tutor';
      form.orderType = 'billpayment';
      form.language = 'vn';
      console.log(form);
      const res = await axios.post(apiCreatPayment, form);
      const { returnCode, result, returnMessage } = res.data;
      if (returnCode === 1) {
        console.log(result);
        // eslint-disable-next-line no-restricted-globals
        location.href = result;
      } else {
        setAlert({ ...alert, message: returnMessage });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickAcceptButton = (idContract) => {
    updateAcceptStatus(idContract);
  };

  const handelClickCancelButton = (idContract) => {
    updateCancelStatus(idContract);
  };
  const handleClickDoneButton = (idContract) => {
    updateDoneStatus(idContract);
  };
  const handleClickReportButton = (contract) => {
    setReportOpen(true);
    setContract(contract);
  };
  const handleClickShowButton = (contract) => {
    setContractOpen(true);
    setContract(contract);
  };
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };
  return (
    <div>
      {alert.message && (
        <div className="alert-field">
          <Alert
            message={alert.message}
            type={alert.type}
            className={classes.alert}
            showIcon
            closable
          />
        </div>
      )}

      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                {user.isTutor ? 'Emai-Student' : 'Email-Tutor'}
              </TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Total Hour</TableCell>
              <TableCell align="center">Total Money</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Detail</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {display.map((row, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {user.isTutor ? row.student : row.tutor}
                </TableCell>
                <TableCell align="center">{row.startDate}</TableCell>
                <TableCell align="center">{row.endDate}</TableCell>
                <TableCell align="center">{row.totalHour || 0} Hours</TableCell>
                <TableCell align="center">{row.totalMoney || 0} USD</TableCell>
                <TableCell align="center">{renderStatus(row.status)}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 2 }}
                    onClick={() => handleClickShowButton(row)}
                  >
                    Show
                  </Button>
                </TableCell>
                {user.isTutor ? (
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 2 }}
                      onClick={() => handleClickAcceptButton(row._id)}
                      hidden={row.status !== 'pending'}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => handelClickCancelButton(row._id)}
                      hidden={
                        row.status !== 'pending' && row.status !== 'paying'
                      }
                    >
                      Cancel
                    </Button>
                  </TableCell>
                ) : (
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 2 }}
                      onClick={() => handleClickDoneButton(row._id)}
                      hidden={
                        row.status !== 'doing' && row.status !== 'reported'
                      }
                    >
                      Done
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginRight: 2 }}
                      onClick={() => handelClickPayButton(row)}
                      hidden={row.status !== 'paying'}
                    >
                      Pay
                    </Button>
                    <Button
                      variant="contained"
                      color="inherit"
                      onClick={() => handelClickCancelButton(row._id)}
                      hidden={
                        row.status !== 'reported'
                        && row.status !== 'pending'
                        && row.status !== 'paying'
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClickReportButton(row)}
                      hidden={row.status !== 'doing' && row.status !== 'done'}
                    >
                      Report
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
      <div>
        <ContractFormDialog
          contract={contract}
          open={contractOpen}
          handleClose={handleClose}
        />
        <Dialog
          fullWidth
          maxWidth="xs"
          scroll="paper"
          open={reportOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Report Form</DialogTitle>
          <Divider />
          <DialogContent>
            <Typography>
              We are so sorry about this issue. Just to make sure: you are
              reporting about contract which was hired on:
            </Typography>
            <Typography variant="subtitle2">{contract.dayOfHire}</Typography>

            <Typography> doing with tutor (email):</Typography>
            <Typography variant="subtitle2">{contract.tutor}</Typography>

            <TextField
              variant="outlined"
              required
              fullWidth
              name="overview"
              // label="Overview"
              placeholder="Tell us about the reason !!!"
              id="overview"
              autoComplete="overview"
              // error={hasError('overview')}
              // helperText={
              //   hasError('overview') ? formState.errors.overview[0] : null
              // }
              onChange={handleReasonChange}
              value={reason}
              multiline
              rows="10"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmButton} color="primary">
              Confirm
            </Button>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
