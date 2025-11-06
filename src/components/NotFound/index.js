import './index.css'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <div className="notfound-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-title">Page Not Found</h1>
      <p className="notfound-text">
        We are sorry, the page you requested could not be found.
      </p>

      <Link to="/" className="notfound-btn">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound
