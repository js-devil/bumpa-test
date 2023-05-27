import React, { useState } from 'react';

import './styles.scss';
import { useLocation } from 'react-router-dom';

const moonlight = require('../../../assets/images/moonlight.png');
const sunlight = require('../../../assets/images/sunlight.png');

const Navbar = ({ onToggle, isDarkMode, countryName }) => {
  const { pathname } = useLocation();

  return (
    <div className="navbar">
      <div className="navbar__content">
        <h1>{pathname === '/' ? 'Where in the world?' : countryName}</h1>

        <button onClick={onToggle}>
          <img
            width="30"
            height="30"
            src={isDarkMode ? moonlight : sunlight}
            alt={isDarkMode ? 'moonlight' : 'sunlight'}
          />

          <span>Dark Mode</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
