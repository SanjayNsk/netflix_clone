import {useContext} from 'react'
import {Link} from 'react-router-dom'
import {AiFillSave} from 'react-icons/ai'
import Header from '../Header'
import Sidebar from '../Sidebar'
import SavedVideosContext from '../../context/SavedVideosContext'
import ThemeContext from '../../context/ThemeContext' // ✅ Import ThemeContext
import './index.css'

function SavedVideos() {
  const {savedVideos} = useContext(SavedVideosContext)
  const {isDarkTheme} = useContext(ThemeContext) // ✅ Use ThemeContext

  const bgColor = isDarkTheme ? 'dark-bg' : 'light-bg'
  const textColor = isDarkTheme ? 'text-light' : 'text-dark'

  const renderNoSavedView = () => (
    <div className="no-saved-wrapper">
      <img
        className="no-saved-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h3 className={`no-saved-heading ${textColor}`}>No saved videos found</h3>
      <p className="no-saved-desc">
        You can save your videos while watching them
      </p>
    </div>
  )

  const renderSavedVideos = () => (
    <ul className="saved-list">
      {savedVideos.map(video => (
        <li
          key={video.id}
          className={`saved-item ${isDarkTheme ? 'item-dark' : 'item-light'}`}
        >
          <Link to={`/videos/${video.id}`} className="saved-link">
            <img
              src={video.thumbnailUrl || video.thumbnail}
              alt={video.title}
              className="saved-thumb"
            />
            <div>
              <h4 className={`saved-title ${textColor}`}>{video.title}</h4>
              <p className={`saved-channel ${textColor}`}>
                {video.channel.name || video.channel}
              </p>
              <p className={`saved-meta ${textColor}`}>
                {video.viewCount || video.views} views • {video.publishedAt}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={`app-container ${bgColor}`}>
      <Header />
      <div className="app-body">
        <Sidebar />
        <div className={`saved-content ${bgColor}`}>
          <div
            className={`saved-header ${
              isDarkTheme ? 'header-dark' : 'header-light'
            }`}
          >
            <div
              className={`saved-header-icon ${
                isDarkTheme ? 'icon-dark' : 'icon-light'
              }`}
            >
              <AiFillSave className="saved-icon" />
            </div>
            <h1 className={`saved-heading ${textColor}`}>Saved Videos</h1>
          </div>

          {savedVideos.length === 0 ? renderNoSavedView() : renderSavedVideos()}
        </div>
      </div>
    </div>
  )
}

export default SavedVideos
