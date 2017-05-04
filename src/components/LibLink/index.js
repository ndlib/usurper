import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class LibLink extends Component {
  render () {
    let to = this.props.to

    if (!to) {
      return (
        <div className={this.props.className}>
          {this.props.children}
        </div>
      )
    }

    if (to.startsWith('http')) {
      return (
        <a href={to} className={this.props.className} alt={this.props.alt}>
          {this.props.children}
        </a>
      )
    }

    return (
      <Link to={to} className={this.props.className} alt={this.props.alt}>
        {this.props.children}
      </Link>
    )
  }
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.any
}

export default LibLink
