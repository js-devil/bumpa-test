import React from 'react';
import './styles.scss';

const BaseSelect = ({ options = [], select, placeholder, ...attrs }) => {
  const setValue = (event) => {
    const { value } = event.target;
    select(value);
  };

  return (
    <div className="select">
      <select className="text--capitalize" onChange={setValue} {...attrs}>
        <option selected value={''}>
          {placeholder}
        </option>

        {options.map((option, index) => {
          return (
            <option className="text--capitalize" key={index} value={option}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default BaseSelect;
