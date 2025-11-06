import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillFire} from 'react-icons/ai'
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

function Trending() {
  const [videos, setVideos] = useState([])
  const [status, setStatus] = useState(apiStatus.initial)
  const history = useHistory()
  const {isDarkTheme} = useContext(ThemeContext)

  const fetchTrending = async () => {
    setStatus(apiStatus.loading)
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updated = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      setVideos(updated)
      setStatus(apiStatus.success)
    } else {
      setStatus(apiStatus.failure)
    }
  }

  useEffect(() => {
    fetchTrending()
  }, [])

  const retryFetch = () => fetchTrending()
  const goToVideo = id => history.push(`/videos/${id}`)

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        height={40}
        width={40}
        color={isDarkTheme ? '#ffffff' : '#4f46e5'}
      />
    </div>
  )

  const renderFailure = () => (
    <div className={`failure-view ${isDarkTheme ? 'dark-failure' : 'light-failure'}`}>
      <img
        src={
          isDarkTheme
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        }
        alt="failure view"
        className="failure-img"
      />
      <h1 className={`failure-heading ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
        Oops! Something Went Wrong
      </h1>
      <p className="failure-desc">
        We are having some trouble completing your request.
      </p>
      <button
        type="button"
        onClick={retryFetch}
        className={`retry-btn ${isDarkTheme ? 'retry-dark' : 'retry-light'}`}
      >
        Retry
      </button>
    </div>
  )

  const renderSuccess = () => (
    <ul className="trending-list">
      {videos.map(each => (
        <li
          key={each.id}
          className={`trending-item ${isDarkTheme ? 'item-dark' : 'item-light'}`}
          onClick={() => goToVideo(each.id)}
        >
          <img src={each.thumbnailUrl} alt="video thumbnail" className="trending-thumb" />
          <div className="video-info">
            <p className={`title ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
              {each.title}
            </p>
            <p className={`channel ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
              {each.channel.name}
            </p>
            <p className={`views ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
              {each.viewCount} views • {each.publishedAt}
            </p>
          </div>
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

  const bgColor = isDarkTheme ? 'dark-bg' : 'light-bg'

  return (
    <div className={`app-container ${bgColor}`}>
      <Header />
      <div className="app-body">
        <Sidebar />
        <div className={`trending-content ${bgColor}`}>
          <div className={`trending-header ${isDarkTheme ? 'header-dark' : 'header-light'}`}>
            <div className={`trending-header-icon ${isDarkTheme ? 'icon-dark' : 'icon-light'}`}>
              <AiFillFire className="trending-icon" />
            </div>
            <h1 className={`page-heading ${isDarkTheme ? 'text-light' : 'text-dark'}`}>
              Trending
            </h1>
          </div>
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default Trending
