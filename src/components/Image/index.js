import { connect } from 'react-redux'

import Image from './presenter'

function mapStateToProps (state, thisProps) {
  let src = thisProps.src
  let alt = thisProps.alt

  if (!src && thisProps.cfImage) {
    src = thisProps.cfImage.fields.file.url
  } else if (!src && thisProps.defaultImage) {
    src = thisProps.defaultImage
  }

  if (!alt && thisProps.cfImage) {
    alt = thisProps.cfImage.fields.title
  }

  return { src: src, alt: alt, className: thisProps.className }
}

export default connect(mapStateToProps)(Image)
