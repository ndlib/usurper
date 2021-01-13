
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class PageTitle extends Component {
  componentDidMount () {
    if (this.props.title) {
      if (this.props.title === 'Hesburgh Libraries') {
        document.title = this.props.title
      } else {
        document.title = this.props.title + ' | Hesburgh Libraries'
      }
    } else {
      document.title = 'Hesburgh Libraries'
    }

    window.scrollTo(0, 0)
  }

  render () {
    if (this.props.hideInPage) {
      return null
    }

    return (
      <header className='page-title'>
        <h1
          id='main-page-title'
          itemProp={this.props.itemProp}
          className={this.props.classes}
        >
          {this.props.title}
          { this.props.subtitle && <small>{this.props.subtitle}</small> }
        </h1>
        <hr aria-hidden='true' className={this.props.className} />
        { this.props.children }
      </header>
    )
  }
}

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  className: PropTypes.string,
  hideInPage: PropTypes.bool,
  itemProp: PropTypes.string,
  children: PropTypes.any,
  classes: PropTypes.string,
}

PageTitle.defaultProps = {
  hideInPage: false,
}

export default PageTitle
