import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import FormInput from './FormInput';
import { userActions } from '../actions/userActions';
import '../styles/profile.scss';

class Profile extends React.Component {
  state = {
    isEditing: false,
    isUnvalidEmail: false
  };

  async componentDidMount() {
    const { loadProfile } = this.props;
    loadProfile();
  }

  handleButtonClick = () => {
    this.setState({ isEditing: true });
  };

  handleEmailChange = newValue => {
    const { editEmail } = this.props;
    this.setState({ isUnvalidEmail: false });
    editEmail(newValue);
  };

  validateEmail = () => {
    const { user } = this.props;
    if (
      user.email !== '' &&
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      this.setState({
        isUnvalidEmail: 'Unvalid email address'
      });
    }
  };

  changeEmail = e => {
    e.preventDefault();
    const { changeEmail, user } = this.props;
    changeEmail(user.id, user.email);
    this.setState({ isEditing: false });
  };

  render() {
    const { isEditing, isUnvalidEmail } = this.state;
    const { isFetching, user, handleSignOut } = this.props;
    if (isFetching) return <CircularProgress className="loader" />;
    return (
      <div className="profile-container">
        <Typography variant="h2" gutterBottom>
          My Profile
        </Typography>
        <Typography>
          <strong>First Name: </strong>
          {user.firstName}
        </Typography>
        <Typography>
          <strong>Last Name: </strong>
          {user.lastName}
        </Typography>
        <div>
          {!isEditing ? (
            <Typography>
              <strong>Email: </strong>
              {user.email}{' '}
              <Button onClick={this.handleButtonClick}>
                <EditIcon />
              </Button>
            </Typography>
          ) : (
            <form onSubmit={this.changeEmail} className="edit-email-form">
              <FormInput
                id="email"
                name="email"
                type="email"
                label="New Email Address"
                autoComplete="email"
                onChange={e => this.handleEmailChange(e.target.value)}
                onBlur={this.validateEmail}
                value={user.email}
                error={isUnvalidEmail}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isUnvalidEmail !== false}
              >
                Change Email
              </Button>
            </form>
          )}
        </div>
        <Typography>
          <strong>Email is validated? </strong>
          {user.emailIsValidated ? 'Yes, good boy!' : 'No, get it done...'}
        </Typography>

        <Button
          type="submit"
          className="sign-out-button"
          variant="contained"
          color="primary"
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </div>
    );
  }
}

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadProfile: PropTypes.func.isRequired,
  editEmail: PropTypes.func.isRequired,
  changeEmail: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.user.isFetching
});

const mapDispatchToProps = () => dispatch => ({
  loadProfile: () => dispatch(userActions.fetchProfile()),
  editEmail: email => dispatch(userActions.editEmail(email)),
  changeEmail: (id, email) => dispatch(userActions.changeEmail(id, email)),
  handleSignOut: () => dispatch(userActions.signOut())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
