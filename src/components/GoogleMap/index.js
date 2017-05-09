import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import '../../static/css/global.css'

const Presenter = (props) => (
  <div>
    <iframe {...props} />
  </div>
)

Presenter.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
}

Presenter.defaultProps = {
  width: '600',
  height: '450'
}

export default Presenter
