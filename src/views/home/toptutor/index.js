import React from 'react';
import { Grid } from '@material-ui/core';
import ProfileCard from '../../../components/profilecard';

const TopTutor = (props) => {
  const { tutor, ...rest } = props;
  const display = tutor
    ? tutor.map((tutor) => {
        // eslint-disable-next-line no-underscore-dangle
        const path = `/view?id=${tutor._id}`;
        return (
          <Grid
            item
            xs={6}
            sm={3}
            // eslint-disable-next-line no-underscore-dangle
            key={tutor._id}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <ProfileCard
              id="card profile"
              path={path}
              name={tutor.name}
              rating={tutor.rating}
              price={tutor.price}
              urlAvatar={tutor.urlAvatar}
              skills={Object.values(tutor.skills).map((value) => {
                return value.name;
              })}
              address={tutor.address}
              {...rest}
            />
          </Grid>
          // eslint-disable-next-line indent
        );
      })
    : null;

  return (
    <Grid container justify="space-around">
      {display}
    </Grid>
  );
};

export default TopTutor;
