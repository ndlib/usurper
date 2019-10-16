import React from 'react'
import PropTypes from 'prop-types'
import { NDCATALOG } from 'constants/searchOptions'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

const AdditionalLinks = (props) => {
  let advancedLink
  if (props.currentSearch.enableAdvancedSearch) {
    let destination = `${Config.onesearchBaseURL}/primo-explore/search?institution=NDU&vid=NDU&mode=advanced`
    if (props.currentSearch.uid === NDCATALOG) {
      destination += '&search_scope=nd_campus'
    }

    advancedLink = (
      <Link key={destination} to={destination} tabIndex='0' className='advanced-basic-toggle'>
        {props.advancedButtonLabel}
      </Link>
    )
  }

  return (
    <div className='additional-links'>
      { advancedLink }
      { props.currentSearch.additionalLinks && (
        <React.Fragment>
          <span> | </span>
          <span>{props.currentSearch.additionalLinks}</span>
        </React.Fragment>
      )}
    </div>
  )
}

AdditionalLinks.propTypes = {
  advancedButtonLabel: PropTypes.string,
  currentSearch: PropTypes.object.isRequired,
}

export default AdditionalLinks
