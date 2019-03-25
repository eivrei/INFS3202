import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import EventIcon from '@material-ui/icons/Event';
import Hidden from '@material-ui/core/Hidden';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { signOut } from '../actions/userActions';

const Navbar = ({ location, loggedIn, handleSignOut }) => (
  <div className="navbar">
    <AppBar position="sticky" color="default" className="app-bar">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className="toolbar-title">
          <NavLink to="/" activeClassName="navbar__active">
            <EventIcon className="icon" />
            The Big Event
          </NavLink>
        </Typography>

        <Button disabled={location.pathname === '/music'}>
          <NavLink to="/music" activeClassName="navbar__active">
            Music
          </NavLink>
        </Button>

        <Button disabled={location.pathname === '/sports'}>
          <NavLink to="/sports" activeClassName="navbar__active">
            Sports
          </NavLink>
        </Button>

        <Button disabled={location.pathname === '/festivals'}>
          <NavLink to="/festivals" activeClassName="navbar__active">
            Festivals
          </NavLink>
        </Button>

        <Button disabled={location.pathname === '/theater&shows'}>
          <NavLink to="/theater&shows" activeClassName="navbar__active">
            Theater/Shows
          </NavLink>
        </Button>

        <Button disabled={location.pathname === '/about'}>
          <NavLink to="/about" activeClassName="navbar__active">
            About
          </NavLink>
        </Button>

        <div className="search">
          <div className="icon">
            <SearchIcon />
          </div>
          <InputBase placeholder="Search…" className="input" />
        </div>

        {loggedIn ? (
          <Button color="primary" disabled={location.pathname === '/sign-out'}>
            <NavLink to="/" activeClassName="navbar__active" onClick={handleSignOut}>
              <AccountCircleIcon className="button-icon" />
              <Hidden smDown>Sign out</Hidden>
            </NavLink>
          </Button>
        ) : (
          <Button color="primary" disabled={location.pathname === '/sign-in'}>
            <NavLink to="/sign-in" activeClassName="navbar__active">
              <AccountCircleIcon className="button-icon" />
              <Hidden smDown>Sign in</Hidden>
            </NavLink>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

Navbar.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

export const mapStateToProps = state => ({
  loggedIn: state.user.isLoggedIn
});
export const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(signOut())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
