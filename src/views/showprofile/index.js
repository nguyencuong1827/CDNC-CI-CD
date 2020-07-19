import React, { useEffect, useState } from 'react';
import {
  Grid,
  Container,
  Card,
  CardMedia,
  Typography,
  CardActions,
  CardContent,
  Button,
  Chip,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
} from '@material-ui/core';
import { People, Chat } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { Alert } from 'antd';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import HireFormDialog from '../../components/hireTutorForm';
import {
  API,
  VIEWTUTOR,
  SENDMESSAGEFROMPROFILE,
  SENDREVIEW,
} from '../../config';
import Review from './review';

const api = `${API}${VIEWTUTOR}`;
const apiSendMessage = `${API}${SENDMESSAGEFROMPROFILE}`;
const apiSendReview = `${API}${SENDREVIEW}`;

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 276,
  },
  chip: {
    marginRight: '5px',
    marginLeft: '5px',
    marginTop: '2px',
  },
  rightContent: {
    height: '100%',
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div> {children}</div>}
    </Typography>
  );
}

const ShowProfile = (props) => {
  const classes = useStyles();

  // eslint-disable-next-line react/destructuring-assignment
  const { search } = props.location;
  const [profile, setProfile] = useState({});
  const [open, setOpen] = useState(false);
  const [openMessageForm, setOpenMessageForm] = useState(false);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [value, setValue] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [defaultReview, setDefaultReview] = useState([]);
  const [totalReviewsList, setTotalReviewsList] = useState(0);
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState('');
  // eslint-disable-next-line no-undef
  const user = JSON.parse(localStorage.getItem('user'));
  const [alert, setAlert] = useState({
    type: 'error',
    message: null,
  });
  // eslint-disable-next-line no-undef
  const token = JSON.parse(localStorage.getItem('token'));
  const fecthTutorInfo = async () => {
    try {
      const res = await axios.get(`${api}${search}`);
      const { tutorInfo, returncode, returnMessage } = res.data;
      if (returncode === 1) {
        setProfile(() => tutorInfo);
        setReviews(tutorInfo.reviews);
        const temp = _.slice(tutorInfo.reviews, 0, 4);
        setDefaultReview(temp);
        setTotalReviewsList(tutorInfo.reviews.length);
      } else console.log(returnMessage);
    } catch (err) {
      console.log(err);
    }
  };

  const { skills } = profile;
  const displaySkills = skills
    ? Object.values(skills).map((value) => (
        // eslint-disable-next-line react/jsx-indent
        <Chip label={value.name} key={value.name} className={classes.chip} />
      ))
    : null;

  useEffect(() => {
    fecthTutorInfo();
  }, [setProfile, setReviews, setDefaultReview, setTotalReviewsList]);
  const handleOpen = () => {
    if (user) {
      if (user.isTutor === true) {
        setAlert({
          ...alert,
          message: 'You can not hire a tutor because you are a tutor !!!',
        });
      } else {
        setOpen(true);
      }
    } else {
      props.history.push('/signin');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenMessageForm = () => {
    setOpenMessageForm(true);
  };

  const handleCloseMessageForm = () => {
    setOpenMessageForm(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    try {
      if (message !== '') {
        const Authorization = `Bearer ${token}`;
        const res = await axios.put(
          `${apiSendMessage}${search}`,
          { message },
          {
            headers: { Authorization },
          }
        );

        const { returnCode } = res.data;

        return returnCode === 1;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSendMessage = () => {
    const a = sendMessage();
    if (a) {
      setOpenMessageForm(false);
      setMessage('');
    }
  };

  const onChangeReview = (e) => {
    setReview(e.target.value);
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };

  const handleOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  const sendReview = async () => {
    try {
      if (review !== '') {
        const Authorization = `Bearer ${token}`;
        const res = await axios.put(
          `${apiSendReview}${search}`,
          { review, rating },
          {
            headers: { Authorization },
          }
        );

        const { returnCode, newReview } = res.data;
        if (returnCode === 1) {
          setReviews([...reviews, newReview]);
          setTotalReviewsList(totalReviewsList + 1);
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleSendReview = () => {
    setReviews([...reviews]);
    setTotalReviewsList(totalReviewsList + 1);
    const newReview = sendReview();
    if (newReview) {
      setReview('');
      setOpenReviewForm(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={4}>
          <Card className={classes.card}>
            {alert.message && (
              <div
                className="alert-field"
                style={{ position: 'absolute', width: 345 }}
              >
                <Alert
                  message={alert.message}
                  type={alert.type}
                  showIcon
                  closable
                />
              </div>
            )}
            <CardMedia
              className={classes.media}
              image={profile.urlAvatar}
              title={profile.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {profile.name}
                {profile.address ? (
                  <Chip
                    label={profile.address.province}
                    key={value.name}
                    className={classes.chip}
                  />
                ) : null}
                <Typography>{profile.price || 0} USD/h</Typography>
              </Typography>
              <Rating name="read-only" value={profile.rating} readOnly />

              <Typography variant="body2" color="textSecondary" component="p">
                {profile.overview || 'Awaiting update...'}
              </Typography>
              <div>{displaySkills}</div>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                style={{ width: '100%' }}
                onClick={handleOpen}
              >
                <People
                  color="primary"
                  style={{ fontSize: 16, marginRight: 2 }}
                />
                Hire
              </Button>
              <Button
                size="small"
                color="default"
                style={{ width: '100%' }}
                onClick={handleOpenMessageForm}
              >
                <Chat
                  color="default"
                  style={{ fontSize: 16, marginRight: 2 }}
                />
                Chat
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <HireFormDialog
          profile={profile}
          open={open}
          handleClose={handleClose}
          setAlert={setAlert}
        />

        <Dialog
          open={openMessageForm}
          onClose={handleCloseMessageForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send message</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ width: 500 }}>
              Start chatting with tutor
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Content..."
              type="text"
              value={message}
              onChange={(e) => onChangeMessage(e)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMessageForm} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendMessage} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openReviewForm}
          onClose={handleCloseReviewForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Your review</DialogTitle>
          <DialogContent>
            <DialogContentText style={{ width: 500 }}>
              Give your reviews about this tutor
            </DialogContentText>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newRating) => {
                setRating(newRating);
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Content..."
              type="text"
              value={review}
              onChange={onChangeReview}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReviewForm} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSendReview} color="primary">
              Send
            </Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={8}>
          <Paper square>
            <div>
              <Tabs
                value={value}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleChange}
                aria-label="disabled tabs example"
              >
                <Tab label="Reviews" />
                <Tab label="Tutor's history" />
                <Button
                  style={{ marginLeft: '43%', marginTop: 5 }}
                  color="primary"
                  onClick={handleOpenReviewForm}
                >
                  Your review
                </Button>
              </Tabs>
            </div>
            <TabPanel value={value} index={0}>
              <Review
                reviews={reviews}
                defaultReview={defaultReview}
                total={totalReviewsList}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              Coming soon...
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ShowProfile;
