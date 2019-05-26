import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormInput from '../components/FormInput';
import { userActions } from '../actions/userActions';

class ForgotPasswordContainer extends React.Component {
  state = {
    email: '',
    uuid: false,
    newPassword: '',
    confirmedPassword: '',
    errors: {
      email: false,
      newPassword: false,
      confirmedPassword: false
    }
  };

  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    const { search } = this.props.history.location;
    if (search.length > 0) {
      const uuid = search.split('=')[1];
      this.setState({
        uuid
      });
    }
  }

  handlePasswordResetRequest = e => {
    e.preventDefault();
    const { email } = this.state;
    const { sendPasswordRequestEmail } = this.props;
    sendPasswordRequestEmail(email);
  };

  handlePasswordReset = e => {
    e.preventDefault();
    const { newPassword, uuid } = this.state;
    const { performPasswordReset } = this.props;
    performPasswordReset(uuid, newPassword);
  };

  handleInputChange = (field, value) => {
    if (field === 'newPassword' || field === 'confirmedPassword') {
      this.setError('newPassword', false);
      this.setError('confirmedPassword', false);
    } else {
      this.setError(field, false);
    }
    this.setState({ [field]: value });
  };

  validateField = field => {
    const { email, newPassword, confirmedPassword } = this.state;

    // eslint-disable-next-line react/destructuring-assignment
    if (this.state[field] === '') {
      return;
    }

    switch (field) {
      case 'email':
        if (
          !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
          )
        ) {
          this.setError(field, 'Invalid email address');
        }
        break;
      case 'newPassword':
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.,;:])(?=.{8,})/.test(newPassword)) {
          this.setError(
            field,
            'Password must contain at least: 8 characters, 1 number, 1 upper case letter, 1 lower case letter and 1 special character(?=.[!@#$%^&*.,;:]) '
          );
        }
        if (confirmedPassword.trim() !== '' && newPassword !== confirmedPassword) {
          this.setError(field, 'Passwords does not match');
          this.setError('confirmedPassword', 'Passwords does not match');
        }
        break;
      case 'confirmedPassword': {
        if (newPassword.trim() !== '' && newPassword !== confirmedPassword) {
          this.setError(field, 'Passwords does not match');
          this.setError('newPassword', 'Passwords does not match');
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

  getCorrectForm = () => {
    const { uuid, email, newPassword, confirmedPassword, errors } = this.state;
    const { isSendingEmail, isChangingPassword } = this.props;
    const isErrors = Object.values(errors).filter(error => error !== false).length !== 0;

    if (uuid) {
      return (
        <form className="form" onSubmit={this.handlePasswordReset}>
          <FormInput
            id="new-password"
            name="newPassword"
            type="password"
            label="New Password"
            autoComplete="new-password"
            onChange={e => this.handleInputChange('newPassword', e.target.value)}
            onBlur={this.validateField}
            value={newPassword}
            error={errors.newPassword}
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

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit-button"
            disabled={isErrors || isChangingPassword}
          >
            Reset Password
          </Button>
        </form>
      );
    }

    return (
      <form className="form" onSubmit={this.handlePasswordResetRequest}>
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email Address"
          autoComplete="email"
          autoFocus
          onChange={e => this.handleInputChange('email', e.target.value)}
          onBlur={this.validateField}
          value={email}
          error={errors.email}
          required
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className="submit-button"
          disabled={isErrors || isSendingEmail}
        >
          Send password reset request
        </Button>
      </form>
    );
  };

  render() {
    return (
      <div className="form">
        <Paper className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Password Reset
          </Typography>
          {this.getCorrectForm()}
        </Paper>
      </div>
    );
  }
}

ForgotPasswordContainer.propTypes = {
  sendPasswordRequestEmail: PropTypes.func.isRequired,
  performPasswordReset: PropTypes.func.isRequired,
  isSendingEmail: PropTypes.bool.isRequired,
  isChangingPassword: PropTypes.bool.isRequired
};

const mapDispatchToProps = () => dispatch => ({
  sendPasswordRequestEmail: email => dispatch(userActions.requestPasswordReset(email)),
  performPasswordReset: (uuid, password) =>
    dispatch(userActions.performPasswordReset(uuid, password))
});

const mapStateToProps = state => ({
  isSendingEmail: state.authentication.isSendingPasswordResetRequest,
  isChangingPassword: state.authentication.isChangingPassword
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordContainer);
