import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import '../../static/css/global.css'

const Presenter = ({ url, width = 600, height = 450 }) => (
  <div className='container-fluid'>
    <Link to={ url }>Map</Link>
  </div>
)

Presenter.propTypes = {
  url: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
}

export default Presenter
