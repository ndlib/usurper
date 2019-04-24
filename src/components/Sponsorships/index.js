import React from 'react'
import PropTypes from 'prop-types'
import LibMarkdown from 'components/LibMarkdown'

const Sponsorships = ({ sponsors }) => {
  if (!sponsors) {
    return null
  }
  return (
    <div className='sponsors'>
      <div><h4>Sponsored by</h4></div>
      <div><LibMarkdown className='sponsor-detail'>{ sponsors }</LibMarkdown></div>
    </div>
  )
}

Sponsorships.propTypes = {
  sponsors: PropTypes.string,
}

export default Sponsorships
