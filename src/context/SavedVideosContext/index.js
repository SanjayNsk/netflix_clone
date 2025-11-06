import {createContext, useState} from 'react'

// Create Context
const SavedVideosContext = createContext()

export function SavedVideosProvider({children}) {
  // 🎥 Saved videos state
  const [savedVideos, setSavedVideos] = useState([])

  // ➕ Save video
  const addVideo = video => {
    const alreadySaved = savedVideos.some(each => each.id === video.id)
    if (!alreadySaved) {
      setSavedVideos(prev => [...prev, video])
    }
  }

  // ➖ Remove video
  const removeVideo = videoId => {
    setSavedVideos(prev => prev.filter(each => each.id !== videoId))
  }

  // 🔁 Toggle Save/Unsave
  const toggleSave = video => {
    const exists = savedVideos.some(each => each.id === video.id)
    if (exists) {
      removeVideo(video.id)
    } else {
      addVideo(video)
    }
  }

  return (
    <SavedVideosContext.Provider
      value={{
        savedVideos,
        addVideo,
        removeVideo,
        toggleSave,
        addOrRemoveVideo: toggleSave, // alias for backward compatibility
      }}
    >
      {children}
    </SavedVideosContext.Provider>
  )
}

export default SavedVideosContext
