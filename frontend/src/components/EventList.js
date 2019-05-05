import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import EventCard from './EventCard';

const EventList = ({ events }) => (
  <Grid container justify="space-between">
    {events.map(({ id, title, shortDescription, image }) => (
      <EventCard key={id} id={id} title={title} shortDescription={shortDescription} image={image} />
    ))}
  </Grid>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default EventList;
