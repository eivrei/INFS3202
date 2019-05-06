import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import './styles/base.scss';
import { history } from './utils/history';
import Landingpage from './components/Landingpage';
import Layout from './components/Layout';
import SignInContainer from './containers/SignInContainer';
import SignUpContainer from './containers/SignUpContainer';
import EventDetailContainer from './containers/EventDetailContainer';
import EventFormContainer from './containers/EventFormContainer';
import VerifyEmailContainer from './containers/VerifyEmailContainer';
import NoMatch from './components/NoMatch';
import PrivateRoute from './containers/PrivateRoute';
import Profile from './components/Profile';
import PositionedSnackbar from './components/PositionedSnackbar';
import { alertActions } from './actions/alertActions';

const App = ({ alert, clearAlert }) => (
  <React.Fragment>
    <CssBaseline />
    <Router history={history}>
      <Layout>
        <PositionedSnackbar
          open={alert.open}
          variant={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
        <Switch>
          <Route path="/" exact component={Landingpage} />
          <Route path="/sign-in" component={SignInContainer} />
          <Route path="/sign-up" component={SignUpContainer} />
          <Route exact path="/events/new" component={EventFormContainer} />
          <Route exact path="/events/:id" component={EventDetailContainer} />
          <Route exact path="/verify-email" component={VerifyEmailContainer} />
          <PrivateRoute exact path="/my-profile" component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </Router>
  </React.Fragment>
);

App.propTypes = {
  alert: PropTypes.shape({
    open: PropTypes.bool,
    type: PropTypes.string,
    message: PropTypes.string
  }).isRequired,
  clearAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

const mapDispatchToProps = dispatch => ({
  clearAlert: () => dispatch(alertActions.clear())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
