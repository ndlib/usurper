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

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  render () {
    if (this.props.hideInPage) {
      return null
    }

    return (
      <div>
        <a id='top' />
        <h1 className="page-title" id="main-page-title" itemProp={this.props.itemProp}>
          {this.props.title}
          { this.props.subtitle && <small>{this.props.subtitle}</small> }
        </h1>
        <hr aria-hidden='true' className={this.props.className} />
      </div>
    )
  }
}

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  hideInPage: PropTypes.bool,
  itemProp: PropTypes.string,
}

PageTitle.defaultProps = {
  hideInPage: false,
}

export default PageTitle
