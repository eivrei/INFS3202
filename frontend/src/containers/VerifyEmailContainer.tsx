import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { get } from '../utils/api';

class VerifyEmailContainer extends React.Component {
  state = {
    isChanged: false,
    isVerifying: true
  };

  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    const { search } = this.props.history.location;
    if (search.length > 0) {
      const queryParams = search.split('=');
      const verificationKey = queryParams[1].split('&')[0];
      const email = queryParams[2];
      const fullUrl = `users/verify_email/?key=${verificationKey}&email=${email}`;
      get(fullUrl).then(response => {
        try {
          switch (response.status) {
            case 200:
              this.setState({ isVerifying: false, isChanged: true });
              break;
            default:
              this.setState({ isVerifying: false, isChanged: false });
              break;
          }
        } catch (err) {
          console.error(`Error: ${err}`);
        }
      });
    }
  }

  render() {
    const { isChanged, isVerifying } = this.state;

    if (isVerifying)
      return <Typography component="h3">Verifying your email. Please wait...</Typography>;

    if (!isVerifying && isChanged)
      return (
        <Typography component="h3">
          Your email was successfully verified. You can now exploit the full potentional of this
          website.
        </Typography>
      );
    return (
      <Typography component="h3">
        Something went wrong while verifying your email. Try again later.
      </Typography>
    );
  }
}

export default connect()(VerifyEmailContainer);
