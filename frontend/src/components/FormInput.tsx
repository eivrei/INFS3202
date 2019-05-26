import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

const FormInput = ({ required, id, name, onBlur, label, error, ...inputProps }) => (
  <FormControl margin="normal" required={required} fullWidth>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Input
      id={id}
      name={name}
      aria-describedby={`${id}-error-text`}
      onBlur={() => onBlur(name)}
      {...inputProps}
    />
    {error && (
      <FormHelperText id={`${id}-error-text`} error>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

FormInput.propTypes = {
  required: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  autoComplete: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

FormInput.defaultProps = {
  type: 'text',
  autoFocus: false,
  autoComplete: '',
  error: false,
  onBlur: () => {}
};

export default FormInput;
