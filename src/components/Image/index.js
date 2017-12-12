import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { fetchEntry } from '../../actions/contentful/entry'

import Presenter from './presenter'

export const mapStateToProps = (state, thisProps) => {
  let src = thisProps.src
  let alt = thisProps.alt
  let hidden = false

  let cfImage = thisProps.cfImage
  if (!src) {
    if (cfImage && !cfImage.fields && state.cfEntry[cfImage.sys.id]) {
      cfImage = state.cfEntry[cfImage.sys.id].json
    }

    if (cfImage && cfImage.fields) {
      src = cfImage.fields.file.url
    } else if (thisProps.defaultImage) {
      src = thisProps.defaultImage
    }
  }

  if (!alt) {
    alt = ''
    hidden = true
  }

  return {
    src: src,
    alt: alt,
    cfImage: cfImage,
    className: thisProps.className,
    ariaHidden: hidden,
    itemProp: thisProps.itemProp,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEntry }, dispatch)
}

export class ImageContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false,
    }
    this.onError = this.onError.bind(this)
  }

  componentDidMount () {
    if (!this.props.src && this.props.cfImage && this.props.cfImage.sys) {
      this.props.fetchEntry(this.props.cfImage.sys.id)
    }
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
      itemProp={this.props.itemProp}
      onError={this.onError}
    />
  }
}

ImageContainer.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,
  itemProp: PropTypes.string,

  // removed in mapping
  cfImage: PropTypes.object,
  defaultImage: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageContainer)
