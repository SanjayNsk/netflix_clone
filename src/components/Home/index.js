import {useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noResults: 'NO_RESULTS',
}

function Home() {
  const [videos, setVideos] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [status, setStatus] = useState(apiStatus.initial)
  const history = useHistory()

  const {isDarkTheme} = useContext(ThemeContext) // ✅ consume theme

  const fetchVideos = async (query = '') => {
    setStatus(apiStatus.loading)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${query}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      if (data.videos.length === 0) {
        setStatus(apiStatus.noResults)
      } else {
        setVideos(data.videos)
        setStatus(apiStatus.success)
      }
    } else {
      setStatus(apiStatus.failure)
    }
  }

  useEffect(() => {
    fetchVideos()
  }, [])

  const onSearchClick = () => fetchVideos(searchInput)
  const retryFetch = () => fetchVideos(searchInput)
  const goToVideo = id => history.push(`/videos/${id}`)

  // ------------------ Views ------------------

  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" height={40} width={40} color="#4f46e5" />
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
      />
      <h1 className={isDarkTheme ? 'text-light' : 'text-dark'}>
        Oops! Something Went Wrong
      </h1>
      <p className="failure-desc">
        We are having trouble completing your request.
      </p>
      <button onClick={retryFetch}>Retry</button>
    </div>
  )

  const renderNoResults = () => (
    <div className="no-results-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1 className={isDarkTheme ? 'text-light' : 'text-dark'}>
        No Search results found
      </h1>
      <p>Try different keywords or remove search filter</p>
      <button onClick={retryFetch}>Retry</button>
    </div>
  )

  const renderSuccess = () => (
    <ul className="videos-list">
      {videos.map(each => (
        <li
          key={each.id}
          className="video-item"
          onClick={() => goToVideo(each.id)}
        >
          <img
            src={each.thumbnail_url}
            alt="video thumbnail"
            className="thumb"
          />
          <p className={isDarkTheme ? 'text-light' : 'text-dark'}>
            {each.title}
          </p>
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
      case apiStatus.noResults:
        return renderNoResults()
      default:
        return null
    }
  }

  const bgClass = isDarkTheme ? 'home-dark' : 'home-light'

  return (
    <div className={`home-container ${bgClass}`}>
      <Header />
      <div className="home-body">
        <Sidebar />
        <div className="home-content">
          <div className="search-box">
            <input
              type="search"
              placeholder="Search"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className={isDarkTheme ? 'input-dark' : 'input-light'}
            />
            <button onClick={onSearchClick}>Search</button>
          </div>
          {renderView()}
        </div>
      </div>
    </div>
  )
}

export default Home
