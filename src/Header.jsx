import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = ({ darkMode, toggleDarkMode }) => {
  const [iconFlipped, setIconFlipped] = useState(false);

  useEffect(() => {
    setIconFlipped(true);
    const timer = setTimeout(() => setIconFlipped(false), 400);
    return () => clearTimeout(timer);
  }, [darkMode]);

  return (
    <header className="header">
      <h1>My To-do List <em>({new Date().getFullYear()})</em></h1>
      <button className="toggle-mode-button" onClick={toggleDarkMode}>
        <FontAwesomeIcon 
          key={darkMode ? 'sun' : 'moon'}
          icon={darkMode ? faSun : faMoon}
          className={`theme-icon ${iconFlipped ? 'rotate' : ""}`} />
      </button>
    </header>
  )
}

export default Header