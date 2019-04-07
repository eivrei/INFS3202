import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Event from '../assets/event1.jpg';
import '../styles/landingpage.scss';

const Landingpage = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Upcoming events
    </Typography>
    <Grid container justify="space-between">
      <Grid item xs={12} sm={6}>
        <Card className="card">
          <CardActionArea>
            <CardMedia className="card__image" image={Event} title="Event 3" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="card">
          <CardActionArea>
            <CardMedia className="card__image" image={Event} title="Event 3" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card className="card">
          <CardActionArea>
            <CardMedia className="card__image" image={Event} title="Event 3" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Lizard
              </Typography>
              <Typography component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  </div>
);

export default Landingpage;
