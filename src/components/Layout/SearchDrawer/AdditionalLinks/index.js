import React from 'react'
import PropTypes from 'prop-types'
import { searchOptions, NDCATALOG } from 'constants/searchOptions'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

const AdditionalLinks = (props) => {
  const links = []
  const opt = searchOptions.find((el) => {
    return el.uid === props.currentSearch.uid
  })
  if (opt && opt.enableAdvancedSearch) {
    let destination = `${Config.onesearchBaseURL}/primo-explore/search?institution=NDU&vid=NDU&mode=advanced`
    if (props.currentSearch.uid === NDCATALOG) {
      destination += '&search_scope=nd_campus'
    }

    links.push(
      <Link
        key={destination}
        to={destination}
        tabIndex='0'
        className='advanced-basic-toggle'
      >{props.advancedButtonLabel}</Link>
    )
  }
  if (props.currentSearch.additionalLinks) {
    if (links.length > 0) {
      links.push(<span key='separator'> | </span>)
    }
    links.push(<span key='additional'>{props.currentSearch.additionalLinks}</span>)
  }

  return (
    <div className='additional-links'>{links}</div>
  )
}

AdditionalLinks.propTypes = {
  advancedButtonLabel: PropTypes.string,
  currentSearch: PropTypes.object,
}

export default AdditionalLinks
