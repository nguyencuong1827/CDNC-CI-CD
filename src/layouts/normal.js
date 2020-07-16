import React from 'react';
import { Container } from '@material-ui/core';
import Header from './header';
import Footer from './footer';

const Home = (props) => {
  const { children } = props;

  return (
    <div>
      <Header />
      <Container maxWidth="lg"> {children}</Container>
      <Footer />
    </div>
  );
};

export default Home;
