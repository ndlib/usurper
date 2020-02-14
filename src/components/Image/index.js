import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { fetchEntry } from 'actions/contentful/entry'
import { withErrorBoundary } from 'components/ErrorBoundary'
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

  fetchImage () {
    if (!this.props.src && this.props.cfImage && this.props.cfImage.sys) {
      const imageID = this.props.cfImage.sys.id
      this.props.fetchEntry(imageID)
    }
  }

  componentDidMount () {
    this.fetchImage()
  }

  componentDidUpdate (prevProps) {
    const currentHasImage = this.props.cfImage && this.props.cfImage.sys
    const prevHasImage = prevProps.cfImage && prevProps.cfImage.sys
    // if this component was updated with a new image, fetch the new image
    if (currentHasImage && prevHasImage && this.props.cfImage.sys.id !== prevProps.cfImage.sys.id) {
      this.fetchImage()
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
      // return null
      console.log('Image load error')
    }

    return (
      <Presenter
        src={this.props.src}
        alt={this.props.alt}
        className={this.props.className}
        containerClassName={this.props.containerClassName}
        ariaHidden={this.props.ariaHidden}
        itemProp={this.props.itemProp}
        onError={this.onError}
      >
        {this.props.children}
      </Presenter>
    )
  }
}

ImageContainer.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  alt: PropTypes.string,
  ariaHidden: PropTypes.bool,
  itemProp: PropTypes.string,
  children: PropTypes.any,

  fetchEntry: PropTypes.func.isRequired,

  // removed in mapping
  cfImage: PropTypes.object,
  defaultImage: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
}

const ImageComponent = connect(mapStateToProps, mapDispatchToProps)(ImageContainer)

export default withErrorBoundary(ImageComponent)
