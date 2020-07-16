import React from 'react';
import { Carousel } from 'antd';
import './style.css';
import banner1 from '../../../assets/images/banner.png';

const Banner = () => (
  <Carousel autoplay>
    <div>
      <img
        src={banner1}
        style={{ height: '320px', width: '100%' }}
        alt="banner"
      />
    </div>
    <div>
      <img
        src={banner1}
        style={{ height: '320px', width: '100%' }}
        alt="banner"
      />
    </div>
    <div>
      <img
        src={banner1}
        style={{ height: '320px', width: '100%' }}
        alt="banner"
      />
    </div>
    <div>
      <img
        src={banner1}
        style={{ height: '320px', width: '100%' }}
        alt="banner"
      />
    </div>
  </Carousel>
);

export default Banner;
