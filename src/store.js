import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import PouchDB from 'pouchdb-browser'

import { merge, pluck, prepend } from 'ramda'
import AuthService from './utils/auth-service'

const auth = new AuthService(
  process.env.REACT_APP_CLIENTID,
  process.env.REACT_APP_DOMAIN
)
const db = PouchDB(process.env.REACT_APP_DBNAME)

const store = createStore(
  combineReducers({
    db: (state = null, action) => {
      switch (action.type) {
        case 'SET_DB':
          return action.payload
        default:
          return state
      }
    },
    links: (state = [], action) => {
      switch (action.type) {
        case 'SET_LINKS':
          return action.payload
        case 'ADD_LINK':
          return prepend(action.payload, state)
        default:
          return state
      }
    },
    link: (state = { name: '', link: '' }, action) => {
      switch (action.type) {
        case 'SET_LINK':
          return merge(state, action.payload)
        default:
          return state
      }
    },
    auth: (state = null, action) => {
      switch (action.type) {
        case 'SET_AUTH':
          return action.payload
        default:
          return state
      }
    },
    user: (state = {}, action) => {
      switch (action.type) {
        case 'SET_USER':
          return action.payload
        default:
          return state
      }
    }
  })
)

store.dispatch({ type: 'SET_DB', payload: db })
store.dispatch({ type: 'SET_AUTH', payload: auth })
auth.on('authenticated', (profile, idToken) => {
  store.dispatch({
    type: 'SET_USER',
    payload: merge(profile, { idToken: idToken })
  })
  sync(idToken)
})
if (auth.loggedIn()) {
  store.dispatch({
    type: 'SET_USER',
    payload: merge(auth.getProfile(), { idToken: auth.getToken() })
  })
  sync(auth.getToken())
}

function sync (jwt) {
  const remoteDb = PouchDB(process.env.REACT_APP_COUCHDB, {
    ajax: { headers: { Authorization: 'Bearer ' + jwt } }
  })
  db.sync(remoteDb, { live: true, retry: true })
}

// db.allDocs({ include_docs: true }).then(res => {
//   store.dispatch({ type: 'SET_LINKS', payload: pluck('doc', res.rows) })
// })
db.changes({ live: true, include_docs: true }).on('change', chg => {
  // TODO: handle add
  store.dispatch({ type: 'ADD_LINK', payload: chg.doc })
})

export default store
