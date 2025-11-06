import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

function App() {
  return (
    <Switch>
      {/* Login Route */}
      <Route exact path="/login" component={Login} />

      {/* Protected Routes */}
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
      <ProtectedRoute exact path="/gaming" component={Gaming} />
      <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
      <ProtectedRoute exact path="/videos/:id" component={VideoItemDetails} />

      <Route path="/not-found" component={NotFound} />

      {/* Redirect anything wrong */}
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default App
