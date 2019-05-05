import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/landingpage.scss';
import EventList from './EventList';
import { eventActions } from '../actions/eventActions';

class Landingpage extends React.Component {
  componentDidMount() {
    const { loadEvents } = this.props;
    loadEvents();
  }

  filterEvents = () => {
    const { events, searchText } = this.props;
    if (searchText !== '') {
      return events.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    return events;
  };

  render() {
    const { events, isLoggedIn } = this.props;

    const filteredEvents = this.filterEvents();
    const isFiltered = filteredEvents.length !== events.length;

    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Upcoming events
        </Typography>
        {isLoggedIn && (
          <Link to="/events/new" className="no-link-decoration">
            <Button variant="contained" color="primary">
              + Add new event
            </Button>
          </Link>
        )}
        <EventList events={filteredEvents} isFiltered={isFiltered} />
      </div>
    );
  }
}

Landingpage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadEvents: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired
};

const mapDispatchToProps = () => dispatch => ({
  loadEvents: () => dispatch(eventActions.loadAllEvents())
});

const mapStateToProps = () => state => ({
  events: state.events.events,
  isLoggedIn: state.authentication.isLoggedIn,
  searchText: state.events.searchText
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landingpage);
