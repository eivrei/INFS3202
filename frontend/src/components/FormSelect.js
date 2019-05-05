import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

const FormSelect = ({ required, id, name, onBlur, label, error, children, ...selectProps }) => (
  <FormControl margin="normal" required={required} fullWidth>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Select
      id={id}
      name={name}
      aria-describedby={`${id}-error-text`}
      onBlur={() => onBlur(name)}
      {...selectProps}
    >
      {children}
    </Select>
    {error && (
      <FormHelperText id={`${id}-error-text`} error>
        {error}
      </FormHelperText>
    )}
  </FormControl>
);

FormSelect.propTypes = {
  required: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

FormSelect.defaultProps = {
  type: 'text',
  error: false,
  onBlur: () => {}
};

export default FormSelect;
