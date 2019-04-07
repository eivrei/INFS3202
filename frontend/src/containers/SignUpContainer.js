import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormInput from '../components/FormInput';
import { userActions } from '../actions/userActions';

class SignUpContainer extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmedPassword: '',
    errors: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmedPassword: false
    }
  };

  componentDidMount() {
    const { isLoggedIn, history } = this.props;

    if (isLoggedIn) {
      history.push('/my-profile');
    }
  }

  handleInputChange = (field, value) => {
    if (field === 'password' || field === 'confirmedPassword') {
      this.setError('password', false);
      this.setError('confirmedPassword', false);
    } else {
      this.setError(field, false);
    }
    this.setState({ [field]: value });
  };

  validateField = field => {
    const { firstName, lastName, email, password, confirmedPassword } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state[field] === '') {
      return;
    }

    switch (field) {
      case 'firstName':
        if (firstName.length < 2) {
          this.setError(field, 'Must contain at least 2 characters');
        } else if (firstName.length > 50) {
          this.setError(field, 'Max 50 characters');
        } else if (!/^[a-zA-ZæøåÆØÅ ]+$/.test(firstName)) {
          this.setError(field, 'Name contains invalid characters');
        }
        break;
      case 'lastName':
        if (lastName.length < 2) {
          this.setError(field, 'Must contain at least 2 characters');
        } else if (lastName.length > 50) {
          this.setError(field, 'Max 50 characters');
        } else if (!/^[a-zA-ZæøåÆØÅ ]+$/.test(lastName)) {
          this.setError(field, 'Name contains invalid characters');
        }
        break;
      case 'email':
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          this.setError(field, 'Invalid email address');
        }
        break;
      case 'password':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:])(?=.{8,})/.test(password)) {
          this.setError(
            field,
            'Password must contain at least: 8 characters, 1 number, 1 upper case letter, 1 lower case letter and 1 special character(?=.[!@#$%^&*.,;:]) '
          );
        }
        if (confirmedPassword.trim() !== '' && password !== confirmedPassword) {
          this.setError(field, 'Passwords does not match');
          this.setError('confirmedPassword', 'Passwords does not match');
        }
        break;
      case 'confirmedPassword': {
        if (password.trim() !== '' && password !== confirmedPassword) {
          this.setError(field, 'Passwords does not match');
          this.setError('password', 'Passwords does not match');
        }
        break;
      }
      default:
        break;
    }
  };

  setError = (field, errorText) => {
    this.setState(prevState => ({ errors: { ...prevState.errors, [field]: errorText } }));
  };

  clearPassword = () => {
    this.setState({ password: '', confirmedPassword: '' });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, firstName, lastName } = this.state;
    const { handleSignUp } = this.props;
    handleSignUp(email, password, firstName, lastName);
    this.clearPassword();
  };

  render() {
    const { firstName, lastName, email, password, confirmedPassword, errors } = this.state;
    const { isRegistering } = this.props;

    const isErrors = Object.values(errors).filter(error => error !== false).length !== 0;

    return (
      <div className="form">
        <Paper className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className="form" onSubmit={this.handleSubmit}>
            <FormInput
              id="first-name"
              name="firstName"
              label="First Name"
              autoComplete="given-name"
              onChange={e => this.handleInputChange('firstName', e.target.value)}
              onBlur={this.validateField}
              value={firstName}
              error={errors.firstName}
              required
              autoFocus
            />
            <FormInput
              id="last-name"
              name="lastName"
              label="Last Name"
              autoComplete="family-name"
              onChange={e => this.handleInputChange('lastName', e.target.value)}
              onBlur={this.validateField}
              value={lastName}
              error={errors.lastName}
              required
            />
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              onChange={e => this.handleInputChange('email', e.target.value)}
              onBlur={this.validateField}
              value={email}
              error={errors.email}
              required
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="new-password"
              onChange={e => this.handleInputChange('password', e.target.value)}
              onBlur={this.validateField}
              value={password}
              error={errors.password}
              required
            />
            <FormInput
              id="confirmed-password"
              name="confirmedPassword"
              type="password"
              label="Confirm Password"
              autoComplete="new-password"
              onChange={e => this.handleInputChange('confirmedPassword', e.target.value)}
              onBlur={this.validateField}
              value={confirmedPassword}
              error={errors.confirmedPassword}
              required
            />

            <div className="submit-button">
              <Typography variant="caption">
                By submitting, you agree to our Terms and Purchase Policy, and understand your
                information will be used as described in our Privacy Policy.
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isErrors || isRegistering}
              >
                Sign up
              </Button>
            </div>
          </form>
          <Typography>
            Already have a The Big Event account? <Link to="/sign-in">Sign in</Link>
          </Typography>
        </Paper>
      </div>
    );
  }
}

SignUpContainer.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  handleSignUp: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleSignUp: (email, password, firstName, lastName) =>
    dispatch(userActions.signUp(email, password, firstName, lastName))
});

const mapStateToProps = state => ({
  isLoggedIn: state.authentication.isLoggedIn,
  isRegistering: state.register.isRegistering
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer);
