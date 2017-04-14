import React from 'react'
import { connect } from 'react-redux'
import { pathOr } from 'ramda'

const LinkForm = props => {
  return (
    <div>
      <h1>Add New Link</h1>
      <div className='pa3'>
        <label className='db mb1'>Name</label>
        <input
          type='text'
          value={pathOr('', [ 'link', 'name' ], props)}
          onChange={
            e =>
              props.dispatch({
                type: 'SET_LINK',
                payload: { name: e.target.value }
              })
          }
        />
      </div>
      <div className='pa3'>
        <label className='db mb1'>Link</label>
        <input
          type='text'
          value={props.link.link}
          onChange={
            e =>
              props.dispatch({
                type: 'SET_LINK',
                payload: { link: e.target.value }
              })
          }
        />
      </div>
      <button
        onClick={e => {
          props.db.post(props.link)
            .then(res => {
              if (res.ok) {
                props.history.push('/')
              }
            })
        }}
      >Add Link</button>
    </div>
  )
}

const connector = connect(state => state)

export default connector(LinkForm)
