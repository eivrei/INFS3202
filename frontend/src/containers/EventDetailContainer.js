import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { eventActions } from '../actions/eventActions';

class EventDetailContainer extends React.Component {
  componentDidMount() {
    const { loadEvent, match } = this.props;
    loadEvent(match.params.id);
  }

  prettifyStartTime = startTime => {
    return new Date(startTime).toLocaleString(undefined, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  render() {
    const { event, isFetching } = this.props;
    if (isFetching || event == null) return null;

    return (
      <div>
        {/* <img alt={event.title} src={event.image} /> */}
        <Typography variant="h2">{event.title}</Typography>
        <Typography variant="h5" gutterBottom>
          {this.prettifyStartTime(event.startTime)} - {event.location}
        </Typography>
        <Typography>{event.description}</Typography>
      </div>
    );
  }
}

EventDetailContainer.propTypes = {
  loadEvent: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string
  }).isRequired,
  isFetching: PropTypes.bool.isRequired
};

const mapDispatchToProps = () => dispatch => ({
  loadEvent: id => dispatch(eventActions.loadEvent(id))
});

const mapStateToProps = () => state => ({
  event: state.events.currentEvent,
  isFetching: state.events.isFetching
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetailContainer);
