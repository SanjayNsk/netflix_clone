import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Sidebar from '../Sidebar'
import ThemeContext from '../../context/ThemeContext'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

function Gaming() {
  const [games, setGames] = useState([])
  const [status, setStatus] = useState(apiStatus.initial)
  const history = useHistory()
  const {isDarkTheme} = useContext(ThemeContext)

  const fetchGamingVideos = async () => {
    setStatus(apiStatus.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      setGames(data.videos)
      setStatus(apiStatus.success)
    } else {
      setStatus(apiStatus.failure)
    }
  }

  useEffect(() => {
    fetchGamingVideos()
  }, [])

  const retryFetch = () => {
    fetchGamingVideos()
  }

  const goToVideo = id => {
    history.push(`/videos/${id}`)
  }

  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height={40} width={40} color="#3b82f6" />
    </div>
  )

  const renderFailure = () => (
    <div className="failure-view">
      <img
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="failure-img"
      />
      <h1
        className={`failure-title ${isDarkTheme ? 'text-light' : 'text-dark'}`}
      >
        Oops! Something Went Wrong
      </h1>
      <p className={`failure-desc ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
        We are having trouble completing your request.
      </p>
      <button onClick={retryFetch} className="retry-btn">
        Retry
      </button>
    </div>
  )

  const renderSuccess = () => (
    <ul className="gaming-list">
      {games.map(each => (
        <li
          key={each.id}
          className="gaming-item"
          onClick={() => goToVideo(each.id)}
        >
          <img
            src={each.thumbnail_url}
            alt="video thumbnail"
            className="gaming-thumb"
          />
          <p className="game-title">{each.title}</p>
          <p className="views">{each.view_count} Watching Worldwide</p>
        </li>
      ))}
    </ul>
  )

  const renderView = () => {
    switch (status) {
      case apiStatus.loading:
        return renderLoader()
      case apiStatus.success:
        return renderSuccess()
      case apiStatus.failure:
        return renderFailure()
      default:
        return null
    }
  }

  return (
    <div
      className={`app-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}
    >
      <Header />
      <div className="main-container">
        <Sidebar />
        <div className="gaming-content">
          <div
            className={`gaming-header ${
              isDarkTheme ? 'dark-section' : 'light-section'
            }`}
          >
            <h1 className="page-heading">🎮 Gaming</h1>
          </div>
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default Gaming
