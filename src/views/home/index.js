import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API, TOPTUTOR } from '../../config';
import Banner from './banner';
import TopTutor from './toptutor';
import Introduce from './introduce';

const api = `${API}${TOPTUTOR}`;

const Home = (props) => {
  const { ...rest } = props;
  const [tutorListing, setTutorListing] = useState([]);
  const fecthTopTutor = async () => {
    try {
      const res = await axios.get(api);
      const { topTutor, returncode } = res.data;

      if (returncode === 1) {
        setTutorListing(() => topTutor);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const checkProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      if (user.p_number === null) {
        // eslint-disable-next-line no-restricted-globals
        location.href = '/profile';
      }
    }
  };

  useEffect(() => {
    fecthTopTutor();
    checkProfile();
  }, []);
  checkProfile();
  return (
    <div>
      <Container maxWidth="lg" style={{ marginBottom: '5px' }}>
        <Banner />
      </Container>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          color="initial"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            marginBottom: '5px',
          }}
          component="h3"
        >
          Top tutor
        </Typography>
        <TopTutor {...rest} tutor={tutorListing} />
        <div style={{ width: '100%', textAlign: 'end' }}>
          <Link
            color="inherit"
            variant="body2"
            to="/tutor/all"
            style={{ flexShrink: '0', marginRight: '20px' }}
          >
            See more...
          </Link>
        </div>
        <Typography
          variant="h5"
          color="initial"
          style={{
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            marginBottom: '5px',
          }}
          component="h3"
        >
          Introduce and service
        </Typography>
        <Introduce />
      </Container>
    </div>
  );
};

export default Home;
