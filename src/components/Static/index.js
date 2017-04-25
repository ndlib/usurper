import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import './style.css'

class Static extends Component {
  // static propTypes = {}
  // static defaultProps = {}
  // state = {}

  render () {
    const { className, ...props } = this.props
    return (
      <div className={classnames('Static', className)} {...props}>
        <h1>
          <small>Static Page Content</small>
        </h1>
      </div>
    )
  }
}
export default Static
