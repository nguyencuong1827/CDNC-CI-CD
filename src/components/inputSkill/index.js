import React, { useState, useEffect } from 'react';
import { TextField, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import { API, ALLSKILL } from '../../config';

const api = `${API}${ALLSKILL}`;

// const schema = {
//   skills: {
//     presence: { allowEmpty: false, message: 'is required' },
//   },
// };

const InputSkill = (props) => {
  // const classes = useStyles();
  const { skills, handleChange, error, helperText, multiple } = props;
  const [listSkill, setListSkill] = useState([]);
  const fetchListSkill = async () => {
    try {
      const res = await axios.get(api);
      const { returncode, result, returnMessage } = await res.data;

      if (returncode === 1) {
        if (skills.length > 0) {
          //  const listSkillName = [];
          const listSkillName = skills.map((element) => element.name);
          //    skills.map(element )
          const list = result.filter((e) => !listSkillName.includes(e.name));
          // console.log('skill', skills);
          // console.log("d",result)
          setListSkill(list);
        } else {
          setListSkill(result);
        }
      } else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchListSkill();
  });
  return (
    <div>
      <Typography>Major Skills</Typography>
      <Typography> --- </Typography>
      <Autocomplete
        filterSelectedOptions
        multiple={multiple}
        options={listSkill}
        getOptionLabel={(option) => option.name}
        defaultValue={skills}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            required
            variant="outlined"
            placeholder="Enter skills here"
            fullWidth
            error={error}
            helperText={helperText}
          />
        )}
      />
    </div>
  );
};

export default InputSkill;
