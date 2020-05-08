import React from 'react';
import './form-style.css';
const CustomCheckbox = ({
  name,
  label,
  onChange,
  disabled,
  style,
  checked
}) => {
  return (
    <label style={style} className='option-label'>
      <input
        type='checkbox'
        checked={checked}
        name={name}
        onChange={onChange}
        className='checkbox-input'
        disabled={disabled}
      />{' '}
      <span className='label-text'>{label}</span>
    </label>
  );
};

export default CustomCheckbox;