import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EventCard from './EventCard';

const getMessageText = isFiltered => {
  return isFiltered ? 'No events matching you search. Try something else.' : 'No upcomping events';
};

const EventList = ({ events, isFiltered }) => (
  <Grid container justify="space-between">
    {events.length !== 0 ? (
      events.map(({ id, title, shortDescription, image }) => (
        <EventCard
          key={id}
          id={id}
          title={title}
          shortDescription={shortDescription}
          image={image}
        />
      ))
    ) : (
      <Typography>{getMessageText(isFiltered)}</Typography>
    )}
  </Grid>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  isFiltered: PropTypes.bool.isRequired
};

export default EventList;
