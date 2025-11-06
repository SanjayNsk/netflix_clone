import {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon, BsSun} from 'react-icons/bs'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

function Header() {
  const {isDarkTheme, toggleTheme} = useContext(ThemeContext)
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const websiteLogo = isDarkTheme
    ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const profileImg =
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png'

  return (
    <nav className={`nav-header ${isDarkTheme ? 'dark-header' : 'light-header'}`}>
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img src={websiteLogo} alt="website logo" className="website-logo" />
        </Link>
      </div>

      <div className="nav-right">
        {/* Theme Toggle */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          data-testid="theme"
        >
          {isDarkTheme ? (
            <BsSun size={22} color="#f9f9f9" />
          ) : (
            <BsMoon size={22} color="#0f0f0f" />
          )}
        </button>

        {/* Profile Image */}
        <img src={profileImg} alt="profile" className="profile-img" />

        {/* Logout Button */}
        <button
          type="button"
          className={`logout-btn ${isDarkTheme ? 'logout-dark' : 'logout-light'}`}
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header
