import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  render () {
    if (!this.props.src && !this.props.cfImage) {
      return null
    }

    let src = this.props.src ? this.props.src : this.props.cfImage.fields.file.url
    let alt = this.props.alt ? this.props.alt : this.props.cfImage.fields.title

    return (
      <span className='frame'>
        <img className={this.props.className} src={src} alt={alt} />
      </span>
    )
  }
}

Image.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  cfImage: PropTypes.object,
}

export default Image
