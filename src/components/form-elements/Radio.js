import React from "react";
import "./form-style.css";
const CustomRadio = ({ name, label, onChange, value, disabled, style }) => {
  return (
    <label style={style} className="option-label">
      <input
        type="radio"
        name={name}
        onChange={onChange}
        value={value}
        className="radio-input"
        disabled={disabled}
      />{" "}
      <span className="label-text">{label}</span>
    </label>
  );
};

export default CustomRadio;