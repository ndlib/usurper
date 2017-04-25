import React, { Component } from 'react'
import classnames from 'classnames'
import './style.css'

class App extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>Welcome to React</h2>
        </div>
      </div>
    )
  }
}

export default App
