import React from 'react'
import { connect } from 'react-redux'

const Login = props => {
  return (
    <div>
      <button
        onClick={e => {
          props.auth.login()
          props.history.push('/')
        }}
      >Login</button>
    </div>
  )
}

const connector = connect(state => state)

export default connector(Login)
