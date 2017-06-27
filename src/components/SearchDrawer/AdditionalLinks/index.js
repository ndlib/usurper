import React from 'react'
import PropTypes from 'prop-types'
import searchOptions, { ONESEARCH, NDCATALOG } from '../searchOptions'

const AdditionalLinks = (props) => {
  let links = []
  let key = 0
  if (props.currentSearch.uid === ONESEARCH || props.currentSearch.uid === NDCATALOG) {
    links.push(<a onClick={props.toggleAdvancedSearch} key={key++}>{props.advancedButtonLabel}</a>)
  }
  if (props.currentSearch.additionalLinks) {
    if (key > 0) {
      links.push(<span key={key++}> | </span>)
    }
    links.push(<span key={key++}>{props.currentSearch.additionalLinks}</span>)
  }

  return (
    <div className='additional-links'>{links}</div>)
}

export default AdditionalLinks
