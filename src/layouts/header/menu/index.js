import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Link } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));

const sections = [
  'Technology',
  'Design',
  'Culture',
  'Business',
  'Politics',
  'Opinion',
  'Science',
  'Health',
  'Style',
  'Travel',
];

const Menu = () => {
  const classes = useStyles();

  return (
    <Toolbar
      component="nav"
      variant="dense"
      className={classes.toolbarSecondary}
    >
      {sections.map((section) => (
        <Link
          color="inherit"
          noWrap
          key={section}
          variant="body2"
          href="/"
          className={classes.toolbarLink}
        >
          {section}
        </Link>
      ))}
    </Toolbar>
  );
};

export default Menu;
