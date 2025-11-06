import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './App'
import {SavedVideosProvider} from './context/SavedVideosContext'
import {ThemeProvider} from './context/ThemeContext'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        {' '}
        {/* ThemeContext provider goes outside */}
        <SavedVideosProvider>
          {' '}
          {/* SavedVideos provider inside */}
          <App />
        </SavedVideosProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
