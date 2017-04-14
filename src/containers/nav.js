import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Nav = props => {
  return (
    <nav>
      {props.auth.loggedIn() && (
      <div>
        <Link className='ba dim pa2 link bg-white-70 mr2' to='/'>
                Home
              </Link>
        <Link className='ba dim pa2 link bg-white-70 mr2' to='/login'>
                Login
              </Link>
        <Link className='ba dim pa2 link bg-white-70 mr2' to='/new'>
                Add Link
              </Link>
        <button
          className='ba dim pa2 link bg-white-70 mr2'
          onClick={e => {
            props.auth.logout()
          
          }}
              >
                Log Out
              </button>
      </div>
          )}
    </nav>
  )
}

const connector = connect(state => state)

export default connector(Nav)
