import React, { useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import _ from 'lodash';
import Pagination from 'material-ui-flat-pagination';

const theme = createMuiTheme();

const Review = (props) => {
  const { reviews, defaultReview, total } = props;
  const [offset, setOffset] = useState(0);
  const [displayListing, setDisplayListing] = useState(defaultReview);

  const handleClick = (offset) => {
    setOffset(offset);
    const display = _.slice(reviews, offset, offset + 4);
    setDisplayListing(display);
  };

  return (
    <div>
      <List>
        {displayListing.length === 0
          ? defaultReview.map((item, index) => {
              const { name, email, urlAvatar } = item.owner;
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={urlAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={name || email}
                      secondary={
                        <>
                          <Typography component="div">
                            <Rating
                              name="read-only"
                              value={item.rating}
                              readOnly
                            />
                          </Typography>
                          {item.content}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })
          : displayListing.map((item, index) => {
              const { name, email, urlAvatar } = item.owner;
              return (
                <div key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={urlAvatar} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={name || email}
                      secondary={
                        <>
                          <Typography component="div">
                            <Rating
                              name="read-only"
                              value={item.rating}
                              readOnly
                            />
                          </Typography>
                          {item.content}
                        </>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              );
            })}
      </List>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginBottom: '5' }}
      >
        <MuiThemeProvider theme={theme}>
          <Pagination
            limit={4}
            offset={offset}
            total={total}
            onClick={(e, offset) => handleClick(offset)}
          />
        </MuiThemeProvider>
      </div>
    </div>
  );
};

export default Review;
