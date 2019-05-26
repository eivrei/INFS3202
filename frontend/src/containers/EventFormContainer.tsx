import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormInput from '../components/FormInput';
import FormSelect from '../components/FormSelect';
import { eventActions } from '../actions/eventActions';

class EventFormContainer extends React.Component {
  state = {
    title: '',
    shortDescription: '',
    description: '',
    type: 'Music',
    location: '',
    startTime: '2019-05-24T10:30',
    maxNumberOfTickets: '',
    visible: false,
    image: '',
    errors: {
      email: false,
      title: false,
      shortDescription: false,
      description: false,
      type: false,
      location: false,
      startTime: false,
      maxNumberOfTickets: false
    }
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: value });
  };

  handleVisibleChange = () => {
    this.setState(prevState => ({
      visible: !prevState.visible
    }));
  };

  validateFields = () => {};

  handleImageUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () =>
        this.setState({
          image: reader.result
        }),
      false
    );
    reader.readAsDataURL(file);
  };

  handleSubmit = e => {
    e.preventDefault();
    const { errors, ...formData } = this.state;
    const { createEvent } = this.props;

    if (formData.image === '') {
      delete formData.image;
    }

    try {
      createEvent(formData);
    } catch (err) {
      console.error(err);
    }
  };

  render() {
    const {
      title,
      shortDescription,
      description,
      type,
      location,
      startTime,
      maxNumberOfTickets,
      visible,
      errors
    } = this.state;
    const { isSubmitting } = this.props;
    const isErrors = Object.values(errors).filter(error => error !== false).length !== 0;

    return (
      <div className="form">
        <Paper className="paper">
          <Typography component="h1" variant="h5">
            Create new event
          </Typography>
          <form className="form" onSubmit={this.handleSubmit}>
            <FormInput
              id="title"
              name="title"
              label="Event title"
              autoFocus
              onChange={e => this.handleInputChange('title', e.target.value)}
              onBlur={this.validateFields}
              value={title}
              error={errors.title}
              required
            />
            <FormInput
              id="shortDescription"
              name="shortDescription"
              label="Short description"
              onChange={e => this.handleInputChange('shortDescription', e.target.value)}
              onBlur={this.validateFields}
              value={shortDescription}
              error={errors.shortDescription}
              required
            />
            <FormInput
              id="description"
              name="description"
              label="Longer description"
              onChange={e => this.handleInputChange('description', e.target.value)}
              onBlur={this.validateFields}
              value={description}
              error={errors.description}
              required
            />
            <FormInput
              id="location"
              name="location"
              label="Location"
              onChange={e => this.handleInputChange('location', e.target.value)}
              onBlur={this.validateFields}
              value={location}
              error={errors.location}
              required
            />
            <FormControl margin="normal" required fullWidth>
              <TextField
                id="startTime"
                name="startTime"
                label="Time and date of event"
                type="datetime-local"
                onChange={e => this.handleInputChange('startTime', e.target.value)}
                onBlur={this.validateFields}
                value={startTime}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </FormControl>
            <FormInput
              id="maxNumberOfTickets"
              name="maxNumberOfTickets"
              type="number"
              label="Number of tickets to event"
              onChange={e => this.handleInputChange('maxNumberOfTickets', e.target.value)}
              onBlur={this.validateFields}
              value={maxNumberOfTickets}
              error={errors.maxNumberOfTickets}
              required
            />
            <FormSelect
              id="type"
              name="type"
              label="Type of event"
              onChange={e => this.handleInputChange('type', e.target.value)}
              onBlur={this.validateFields}
              value={type}
              error={errors.type}
              required
            >
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Festivals">Festivals</MenuItem>
              <MenuItem value="Theater/Shows">Theater/Shows</MenuItem>
            </FormSelect>

            <FormControlLabel
              control={
                <Checkbox
                  value="visible"
                  color="primary"
                  onChange={this.handleVisibleChange}
                  checked={visible}
                />
              }
              label="Visible on website?"
            />
            <div>
              <Typography>Event image</Typography>
              <input accept="image/*" type="file" onChange={this.handleImageUpload} />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit-button"
              disabled={isErrors || isSubmitting}
            >
              Create
            </Button>
          </form>
        </Paper>
      </div>
    );
  }
}

EventFormContainer.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  createEvent: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  createEvent: data => dispatch(eventActions.createNewEvent(data))
});

const mapStateToProps = state => ({
  isSubmitting: state.events.isSubmitting
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventFormContainer);
