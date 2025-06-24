import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="header">
      <h1>My To-do List <em>({new Date().getFullYear()})</em></h1>
      <button className="toggle-mode-button" onClick={toggleDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
    </header>
  )
}

export default Header