import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  CardMedia,
  CardContent,
  Card,
  CardActionArea,
  Typography,
  Chip,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
    minWidth: 250,
  },
  chip: {
    marginRight: '5px',
  },
});
const ProfileCard = (props) => {
  const classes = useStyles();
  const { path, rating, name, price, urlAvatar, skills, address } = props;

  const handleClick = () => {
    props.history.push(path);
  };

  const displaySkills = skills
    ? skills.map((skill, index) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={skill} key={index} className={classes.chip} />
      ))
    : null;

  return (
    <Card className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={urlAvatar}
          title={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
            {address && (
              <Chip
                label={address.province}
                className={classes.chip}
              />
            )}
            <Typography>{price || 0} USD/h</Typography>
          </Typography>
          <Rating name="read-only" value={rating || 0} readOnly />
          <div>{displaySkills}</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
