import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import EventCard from './EventCard';

const EventList = ({ events }) => (
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
      <Typography>No upcomping events</Typography>
    )}
  </Grid>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList;
