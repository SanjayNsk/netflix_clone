import {useContext} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {AiFillHome, AiFillFire, AiOutlineSave} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

function Sidebar() {
  const {isDarkTheme} = useContext(ThemeContext)
  const history = useHistory()
  const location = useLocation()

  const goTo = path => history.push(path)

  const getActiveClass = path =>
    location.pathname === path ? 'active-item' : ''

  const sidebarBg = isDarkTheme ? 'sidebar-dark' : 'sidebar-light'
  const textClass = isDarkTheme ? 'text-light' : 'text-dark'

  return (
    <div className={`sidebar-container ${sidebarBg}`}>
      <ul className="sidebar-list">
        <li
          className={`sidebar-item ${getActiveClass('/')}`}
          onClick={() => goTo('/')}
        >
          <AiFillHome
            size={20}
            color={isDarkTheme ? '#f9f9f9' : '#181818'}
            className="sidebar-icon"
          />
          <span className={`sidebar-text ${textClass}`}>Home</span>
        </li>

        <li
          className={`sidebar-item ${getActiveClass('/trending')}`}
          onClick={() => goTo('/trending')}
        >
          <AiFillFire
            size={20}
            color={isDarkTheme ? '#f9f9f9' : '#181818'}
            className="sidebar-icon"
          />
          <span className={`sidebar-text ${textClass}`}>Trending</span>
        </li>

        <li
          className={`sidebar-item ${getActiveClass('/gaming')}`}
          onClick={() => goTo('/gaming')}
        >
          <SiYoutubegaming
            size={20}
            color={isDarkTheme ? '#f9f9f9' : '#181818'}
            className="sidebar-icon"
          />
          <span className={`sidebar-text ${textClass}`}>Gaming</span>
        </li>

        <li
          className={`sidebar-item ${getActiveClass('/saved-videos')}`}
          onClick={() => goTo('/saved-videos')}
        >
          <AiOutlineSave
            size={20}
            color={isDarkTheme ? '#f9f9f9' : '#181818'}
            className="sidebar-icon"
          />
          <span className={`sidebar-text ${textClass}`}>Saved Videos</span>
        </li>
      </ul>

      <div className="sidebar-footer">
        <p className={`contact-title ${textClass}`}>CONTACT US</p>
        <div className="social-icons">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="social-icon"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="social-icon"
          />
        </div>
        <p className={`contact-desc ${textClass}`}>
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )
}

export default Sidebar
