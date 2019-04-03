import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormInput from '../components/FormInput';
import { userActions } from '../actions/userActions';

class SignInContainer extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    errors: {
      email: false
    }
  };

  componentDidMount() {
    const { isLoggedIn, history } = this.props;

    if (isLoggedIn) {
      history.push('/my-profile');
    }
  }

  handleInputChange = (field, value) => {
    this.setState({ [field]: value, errors: { email: false } });
  };

  handleRememberChange = () => {
    this.setState(prevState => ({
      remember: !prevState.remember
    }));
  };

  validateEmail = () => {
    const { email } = this.state;
    if (
      email !== '' &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, email: 'Unvalid email address' }
      }));
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, remember } = this.state;
    const { handleSignIn } = this.props;
    try {
      handleSignIn(email, password, remember);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const { email, password, remember, errors } = this.state;
    return (
      <div className="form">
        <Paper className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.handleSubmit}>
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
              onChange={e => this.handleInputChange('email', e.target.value)}
              onBlur={this.validateEmail}
              value={email}
              error={errors.email}
              required
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              onChange={e => this.handleInputChange('password', e.target.value)}
              value={password}
              error={errors.password}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={this.handleRememberChange}
                  checked={remember}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
            >
              Sign in
            </Button>
          </form>
          <Typography>
            <Link to="/forgot-password">Forgot password?</Link>
          </Typography>
          <Typography>
            New to The Big Event? <Link to="/sign-up">Sign up</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

SignInContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleSignIn: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSignIn: (username, password, remember) =>
    dispatch(userActions.signIn(username, password, remember))
});

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInContainer);
