import {useState, useEffect, useContext} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'
import SavedVideosContext from '../../context/SavedVideosContext'
import ThemeContext from '../../context/ThemeContext' // ✅ Import ThemeContext
import Header from '../Header'
import Sidebar from '../Sidebar'
import './index.css'

const apiStatusConstants = {
  INITIAL: 'INITIAL',
  IN_PROGRESS: 'IN_PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

function VideoItemDetails() {
  const {id} = useParams()
  const [videoData, setVideoData] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.INITIAL)
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  const {addOrRemoveVideo, savedVideos} = useContext(SavedVideosContext)
  const {isDarkTheme} = useContext(ThemeContext) // ✅ Use ThemeContext

  const jwtToken = Cookies.get('jwt_token')

  const getFormattedData = data => ({
    id: data.id,
    title: data.title,
    videoUrl: data.video_url,
    thumbnailUrl: data.thumbnail_url,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
    viewCount: data.view_count,
    publishedAt: data.published_at,
    description: data.description,
  })

  const getVideoDetails = async () => {
    setApiStatus(apiStatusConstants.IN_PROGRESS)
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = getFormattedData(data.video_details)
      setVideoData(updatedData)
      setApiStatus(apiStatusConstants.SUCCESS)
    } else {
      setApiStatus(apiStatusConstants.FAILURE)
    }
  }

  useEffect(() => {
    getVideoDetails()
  }, [id])

  const onClickRetry = () => getVideoDetails()

  const renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color={isDarkTheme ? '#ffffff' : '#3b82f6'}
        height={50}
        width={50}
      />
    </div>
  )

  const onClickLike = () => {
    setIsLiked(prev => !prev)
    if (!isLiked) setIsDisliked(false)
  }

  const onClickDislike = () => {
    setIsDisliked(prev => !prev)
    if (!isDisliked) setIsLiked(false)
  }

  const isSaved = savedVideos.some(each => each.id === videoData.id)
  const onClickSave = () => addOrRemoveVideo(videoData)

  const renderFailureView = () => (
    <div className={`failure-view ${isDarkTheme ? 'dark-bg' : 'light-bg'}`}>
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
        className={
          isDarkTheme ? 'failure-heading-dark' : 'failure-heading-light'
        }
      >
        Oops! Something Went Wrong
      </h1>
      <p
        className={`failure-description ${
          isDarkTheme ? 'text-light' : 'text-dark'
        }`}
      >
        We are having some trouble completing your request. Please try again.
      </p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )

  const renderSuccessView = () => {
    const {title, videoUrl, channel, viewCount, publishedAt, description} =
      videoData

    return (
      <div
        className={`video-details-container ${
          isDarkTheme ? 'dark-bg' : 'light-bg'
        }`}
      >
        <ReactPlayer url={videoUrl} controls width="100%" height="60vh" />
        <p
          className={`video-title ${isDarkTheme ? 'dark-text' : 'light-text'}`}
        >
          {title}
        </p>
        <div className="video-meta">
          <div className="views-date">
            <p>{viewCount} views</p>
            <p>{publishedAt}</p>
          </div>

          <div className="buttons-container">
            <button
              type="button"
              className={`icon-btn ${isLiked ? 'active' : ''}`}
              onClick={onClickLike}
            >
              <BiLike size={20} /> Like
            </button>

            <button
              type="button"
              className={`icon-btn ${isDisliked ? 'active' : ''}`}
              onClick={onClickDislike}
            >
              <BiDislike size={20} /> Dislike
            </button>

            <button
              type="button"
              className={`icon-btn ${isSaved ? 'active' : ''}`}
              onClick={onClickSave}
            >
              <MdPlaylistAdd size={22} /> {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        <hr className="separator" />

        <div className="channel-info">
          <img
            src={channel.profileImageUrl}
            alt="channel logo"
            className="channel-logo"
          />
          <div>
            <p
              className={`channel-name ${
                isDarkTheme ? 'text-light' : 'text-dark'
              }`}
            >
              {channel.name}
            </p>
            <p
              className={`sub-count ${
                isDarkTheme ? 'text-light' : 'text-dark'
              }`}
            >
              {channel.subscriberCount} subscribers
            </p>
          </div>
        </div>
        <p
          className={`video-description ${
            isDarkTheme ? 'text-light' : 'text-dark'
          }`}
        >
          {description}
        </p>
      </div>
    )
  }

  const renderVideoDetails = () => {
    switch (apiStatus) {
      case apiStatusConstants.IN_PROGRESS:
        return renderLoadingView()
      case apiStatusConstants.SUCCESS:
        return renderSuccessView()
      case apiStatusConstants.FAILURE:
        return renderFailureView()
      default:
        return null
    }
  }

  const bgColor = isDarkTheme ? 'dark-bg' : 'light-bg'

  return (
    <div
      className={`video-item-details-app ${bgColor}`}
      data-testid="videoItemDetails"
    >
      <Header />
      <div className="video-details-body">
        <Sidebar />
        <div className="video-content-section">{renderVideoDetails()}</div>
      </div>
    </div>
  )
}

export default VideoItemDetails
