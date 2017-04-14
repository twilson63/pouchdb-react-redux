import Auth0Lock from 'auth0-lock'
import { EventEmitter } from 'events'

export default class AuthService extends EventEmitter {
  constructor (clientId, domain) {
    super()
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain)

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication (authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // TODO: Notify any listeners
    this.lock.getProfile(authResult.idToken, (err, profile) => {
      this.setProfile(profile)

      this.emit('authenticated', profile, authResult.idToken)
    })
  }

  login () {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn () {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken (idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken () {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  setProfile (profile) {
    // Saves user token to local storage
    localStorage.setItem('profile', profile)
  }

  getProfile () {
    // Retrieves the user token from local storage
    return localStorage.getItem('profile')
  }

  logout () {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token')
  }
}
