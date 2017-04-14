import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { map } from 'ramda'

const Home = props => {
  const li = link => <li key={link._id}><Link to={`/${link._id}`}>{link.name}</Link></li>
  return (
    <div>
      <h1>Home</h1>
      <ul className='list'>
        {map(li, props.links)}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return { links: state.links }
}

const connector = connect(mapStateToProps)

export default connector(Home)
