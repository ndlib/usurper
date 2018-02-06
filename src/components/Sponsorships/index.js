import React from 'react'
import PropTypes from 'prop-types'
import LibMarkdown from '../LibMarkdown'

const Sponsorships = ({ sponsors }) => {
  console.log('SPONSORS: ' + JSON.stringify(sponsors))
  return (
    <div className='sponsors'>
      <div><h4>Sponsored By</h4></div>
      <div><LibMarkdown className='sponsor-detail'>{ sponsors }</LibMarkdown></div>
    </div>
  )
}

Sponsorships.propTypes = {
  sponsors: PropTypes.string.isRequired,
}

export default Sponsorships
