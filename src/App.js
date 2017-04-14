import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import Home from './containers/home'
import LinkForm from './containers/link-form'
import Login from './containers/login'
import Nav from './containers/nav'
import Show from './containers/show'

class App extends Component {
  render () {
    const props = this.props
    return (
      <BrowserRouter>
        <div>
          <header className='pa4 bg-yellow'>
            <h1>Awesome Links App</h1>
            <Nav />
          </header>
          <main className='pa4'>
            <PrivateRoute exact path='/' component={Home} auth={props.auth} />
            <Route path='/login' component={Login} />
            <Switch>
              <PrivateRoute
                path='/new'
                component={LinkForm}
                auth={props.auth}
              />
              <PrivateRoute path='/:id' component={Show} auth={props.auth} />
            </Switch>
          </main>
        </div>
      </BrowserRouter>
    )
  }
}

const PrivateRoute = ({ component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.loggedIn()) {
          return React.createElement(component, props)
        } else {
          return <Redirect to='/login' />
        }
      }}
    />
  )
}

const connector = connect(state => state)
export default connector(App)
