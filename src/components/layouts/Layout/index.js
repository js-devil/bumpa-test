import React, { useContext } from 'react';
import Navbar from '../../navigation/Navbar';
import { AppContext } from '../../../App';

const Layout = ({ children }) => {
  const { storeDataValue, dispatch } = useContext(AppContext);
  const { darkMode, countryName } = storeDataValue;

  const toggleDarkMode = () => {
    console.log('first: ', { darkMode });

    dispatch({ type: 'TOGGLE_DARK_MODE' });
    console.log('second: ', { darkMode });
  };

  return (
    <div className={darkMode ? 'darkMode' : ''}>
      <Navbar
        onToggle={toggleDarkMode}
        countryName={countryName}
        isDarkMode={darkMode}
      />

      <main className="container">{children}</main>
    </div>
  );
};

export default Layout;
