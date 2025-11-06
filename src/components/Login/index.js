import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

function Login() {
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/') // ✅ navigate to Home
  }

  const onSubmitFailure = msg => {
    setErrorMsg(msg) // ✅ show error message
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" /> // ✅ Auth user trying login→ go home
  }

  return (
    <div className="login-page">
      <form onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
        />

        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          id="showPassword"
          type="checkbox"
          checked={showPassword}
          onChange={e => setShowPassword(e.target.checked)}
        />
        <label htmlFor="showPassword">Show Password</label>

        <button type="submit" className="btn btn-primary mt-2">
          Login
        </button>

        {errorMsg && <p className="error-msg">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default Login
