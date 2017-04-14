import React from 'react'

import { connect } from 'react-redux'
import { Card } from 'jrs-react-components'

class Show extends React.Component {
  componentDidMount () {
    const id = this.props.match.params.id
    const db = this.props.db
    db
      .get(id)
      .then(doc => this.props.dispatch({ type: 'SET_LINK', payload: doc }))
  }
  render () {
    const props = this.props
    return (
      <div>
        <Card
          title={props.link.name}
         >
         <img src={props.link.link} />
         </Card>
      
      </div>
    )
  }
}

const connector = connect(state => state)

export default connector(Show)
