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
import { userActions } from '../actions/userActions';
import { eventActions } from '../actions/eventActions';

const Navbar = ({ location, isLoggedIn, handleSignOut, search, searchText }) => (
  <div className="navbar">
    <AppBar position="sticky" color="default" className="app-bar">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap className="toolbar-title">
          <NavLink to="/" activeClassName="navbar__active">
            <EventIcon className="icon" />
            The Big Event
          </NavLink>
        </Typography>

        <NavLink to="/music" activeClassName="navbar__active">
          <Button disabled={location.pathname === '/music'}>Music</Button>
        </NavLink>

        <NavLink to="/sports" activeClassName="navbar__active">
          <Button disabled={location.pathname === '/sports'}>Sports</Button>
        </NavLink>

        <NavLink to="/festivals" activeClassName="navbar__active">
          <Button disabled={location.pathname === '/festivals'}>Festivals</Button>
        </NavLink>

        <NavLink to="/theater&shows" activeClassName="navbar__active">
          <Button disabled={location.pathname === '/theater&shows'}>Theater/Shows</Button>
        </NavLink>

        <NavLink to="/about" activeClassName="navbar__active">
          <Button disabled={location.pathname === '/about'}>About</Button>
        </NavLink>

        <div className="search">
          <div className="icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            className="input"
            onChange={e => search(e.target.value)}
            value={searchText}
          />
        </div>

        {isLoggedIn ? (
          <NavLink to="/" activeClassName="navbar__active" onClick={handleSignOut}>
            <Button color="primary" disabled={location.pathname === '/sign-out'}>
              <AccountCircleIcon className="button-icon" />
              <Hidden smDown>Sign out</Hidden>
            </Button>
          </NavLink>
        ) : (
          <NavLink to="/sign-in" activeClassName="navbar__active">
            <Button color="primary" disabled={location.pathname === '/sign-in'}>
              <AccountCircleIcon className="button-icon" />
              <Hidden smDown>Sign in</Hidden>
            </Button>
          </NavLink>
        )}
      </Toolbar>
    </AppBar>
  </div>
);

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
  searchText: state.events.searchText
});

export const mapDispatchToProps = dispatch => ({
  handleSignOut: () => dispatch(userActions.signOut()),
  search: searchText => dispatch(eventActions.searchEvent(searchText))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Navbar)
);
