import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../styles/landingpage.scss';
import EventList from './EventList';
import { eventActions } from '../actions/eventActions';

class Landingpage extends React.Component {
  filterEvents = () => {
    const { events, searchText } = this.props;
    if (searchText !== '') {
      return events.filter(event => event.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    return events;
  };

  render() {
    const { events, isLoggedIn, nextPage, loadEvents } = this.props;

    const filteredEvents = this.filterEvents();
    const isFiltered = filteredEvents.length !== events.length;

    return (
      <div>
        <Typography variant="h2" gutterBottom>
          Upcoming events
        </Typography>
        {isLoggedIn && (
          <Link to="/events/new" className="no-link-decoration">
            <Button variant="contained" color="primary" className="new-button">
              + Add new event
            </Button>
          </Link>
        )}
        <InfiniteScroll
          pageStart={0}
          loadMore={loadEvents}
          hasMore={nextPage !== null}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <EventList events={filteredEvents} isFiltered={isFiltered} />
        </InfiniteScroll>
      </div>
    );
  }
}

Landingpage.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  nextPage: PropTypes.string.isRequired,
  loadEvents: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  searchText: PropTypes.string.isRequired
};

const mapDispatchToProps = () => dispatch => ({
  loadEvents: nextPage => dispatch(eventActions.loadAllEvents(nextPage))
});

const mapStateToProps = () => state => ({
  events: state.events.events,
  nextPage: state.events.nextPage,
  isLoggedIn: state.authentication.isLoggedIn,
  searchText: state.events.searchText
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landingpage);
