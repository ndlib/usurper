import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Presenter from './presenter'

export const mapStateToProps = (state, thisProps) => {
  let src = thisProps.src
  let alt = thisProps.alt
  let hidden = false

  if (!src && thisProps.cfImage && thisProps.cfImage.fields) {
    src = thisProps.cfImage.fields.file.url
  } else if (!src && thisProps.defaultImage) {
    src = thisProps.defaultImage
  }

  if (!alt) {
    alt = ''
    hidden = true
  }

  return { src: src, alt: alt, className: thisProps.className, ariaHidden: hidden }
}

export class ImageContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
    }
    this.onError = this.onError.bind(this)
  }

  onError () {
    this.setState({ error: true })
  }

  render () {
    if (!this.props.src) {
      return null
    }

    if (this.state.error) {
      return null
    }

    return <Presenter
      src={this.props.src}
      alt={this.props.alt}
      className={this.props.className}
      ariaHidden={this.props.ariaHidden}
      onError={this.onError}
    />
  }
}

ImageContainer.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,

  // removed in mapping
  cfImage: PropTypes.object,
  defaultImage: PropTypes.string,
}

export default connect(mapStateToProps)(ImageContainer)
