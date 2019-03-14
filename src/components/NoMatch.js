import React from 'react';
import Typography from '@material-ui/core/Typography';

const NoMatch = () => (
  <div>
    <Typography component="h2" variant="h2" gutterBottom>
      404
    </Typography>
    <Typography component="p">Could not find what you are looking for...</Typography>
  </div>
);

export default NoMatch;
