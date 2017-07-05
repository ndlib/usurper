import { connect } from 'react-redux'

import Image from './presenter'

export const mapStateToProps = (state, thisProps) => {
  let src = thisProps.src
  let alt = thisProps.alt

  if (!src && thisProps.cfImage && thisProps.cfImage.fields) {
    src = thisProps.cfImage.fields.file.url
  } else if (!src && thisProps.defaultImage) {
    src = thisProps.defaultImage
  }

  if (!alt) {
    alt = ''
  }

  return { src: src, alt: alt, className: thisProps.className }
}

export default connect(mapStateToProps)(Image)
