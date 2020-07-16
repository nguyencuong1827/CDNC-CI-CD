import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  card: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

const Introduce = () => {
  const classes = useStyles();

  return (
    <Grid container justify="space-around">
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://assets.static-upwork.com/assets/Adquiro/954ee31/wp/images/admin-support-desktop.ff2e0d4dc35d.svg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: 'center' }}
              >
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://assets.static-upwork.com/assets/Adquiro/954ee31/wp/images/admin-support-desktop.ff2e0d4dc35d.svg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: 'center' }}
              >
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://assets.static-upwork.com/assets/Adquiro/954ee31/wp/images/admin-support-desktop.ff2e0d4dc35d.svg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: 'center' }}
              >
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image="https://assets.static-upwork.com/assets/Adquiro/954ee31/wp/images/admin-support-desktop.ff2e0d4dc35d.svg"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                style={{ textAlign: 'center' }}
              >
                Lizard
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Introduce;
