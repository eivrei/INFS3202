import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { userActions } from '../actions/userActions';

class Profile extends React.Component {
  async componentDidMount() {
    const { loadProfile } = this.props;
    loadProfile();
  }

  render() {
    const { isFetching, user } = this.props;
    if (isFetching) return <CircularProgress className="loader" />;
    return (
      <div>
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
        <Typography>
          <strong>Email: </strong>
          {user.email}
        </Typography>
        <Typography>
          <strong>Email is validated? </strong>
          {user.emailIsValidated ? 'Yes, good boy!' : 'No, get it done...'}
        </Typography>
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
  loadProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.user.isFetching
});

const mapDispatchToProps = () => dispatch => ({
  loadProfile: () => dispatch(userActions.fetchProfile())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
