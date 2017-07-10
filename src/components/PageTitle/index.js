'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageTitle extends Component {
  componentWillMount () {
    if (this.props.title) {
      document.title = this.props.title + ' | Hesburgh Library'
    } else {
      document.title = 'Hesburgh Library'
    }
  }

  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <hr aria-hidden='true' className={this.props.className} />
      </div>
    )
  }
}

PageTitle.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
}

export default PageTitle
