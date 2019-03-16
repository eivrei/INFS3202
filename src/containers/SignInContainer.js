import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormInput from '../components/FormInput';

class LoginContainer extends React.Component {
  state = {
    email: '',
    password: '',
    remember: false,
    errors: {
      email: false
    }
  };

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
    console.log('submit');
    e.preventDefault();
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
          <form className="form">
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
              onClick={this.handleSubmit}
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

export default LoginContainer;
