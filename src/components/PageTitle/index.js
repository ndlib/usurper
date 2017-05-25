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
      <span />
    )
  }
}

PageTitle.propTypes = {
  title: PropTypes.string,
}

export default PageTitle
