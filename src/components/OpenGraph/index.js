import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import DefaultImage from '../../static/images/search.banner.jpg'

const OpenGraph = (props) => {
  const url = props.url || window.location.href
  const type = props.type || 'article'
  const title = props.title || document.title || 'Hesburgh Library'
  const description = props.description || 'Hesburgh Library - University of Notre Dame'
  let image = DefaultImage
  if (props.image && props.image.fields && props.image.fields.file) {
    image = props.image.fields.file.url
  }

  return (
    <Helmet>
      <meta property='og:url' content={url} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
    </Helmet>
  )
}

OpenGraph.propTypes = {
  url: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.oneOfType([ PropTypes.string, PropTypes.object, PropTypes.bool ]),
}
export default OpenGraph
