import React from 'react'
import PropTypes from 'prop-types'
import searchOptions, { NDCATALOG } from '../searchOptions'

const PartnerSearchToggle = (props) => {
  if (props.currentSearch.uid === NDCATALOG) {
    return (<span className='searchPartners'>Search Partner Libraries<input
      type='checkbox'
      id='searchPartners'
      onChange={props.onChange}
    /></span>)
  }
  return null
}

PartnerSearchToggle.propTypes = {
  currentSearch: PropTypes.object.isRequired,
}

export default PartnerSearchToggle
