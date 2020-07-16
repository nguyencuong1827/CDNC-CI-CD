import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const jsonPlacesData = require('../../constants/dataPlaces.json');

const listProvince = Object.values(jsonPlacesData).map((value) => {
  return value.name;
});
const listDistrict = Object.values(jsonPlacesData).map((value) => {
  return Object.values(value.districts).map((value) => {
    return value;
  });
});
const useStyles = makeStyles({});
const AddressCard = (props) => {
  const classes = useStyles();
  const {
    address,
    indexProvince,
    handleDistrictChange,
    handleProvinceChange,
    errorPro,
    helperTextPro,
    errorDis,
    helperTextDis,
  } = props;

  return (
    <div>
      <Typography>Address</Typography>
      <Typography> --- </Typography>
      <Autocomplete
        //       id="combo-box-demo"
        options={listProvince}
        // getOptionLabel={(option) => option}
        // filterSelectedOptions
        onChange={handleProvinceChange}
        value={address.province || ''}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="Province"
            variant="outlined"
            placeholder="Enter province here"
            fullWidth
            error={errorPro}
            helperText={helperTextPro}
          />
        )}
      />
      <Typography> --- </Typography>
      <Autocomplete
        //    id="combo-box-demo"
        options={listDistrict[indexProvince]}
        //      getOptionLabel={(option) => option}
        //    filterSelectedOptions
        onChange={handleDistrictChange}
        value={address.district || ''}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            label="District"
            variant="outlined"
            placeholder="Enter district here"
            fullWidth
            error={errorDis}
            helperText={helperTextDis}
          />
        )}
      />
    </div>
  );
};

export default AddressCard;
