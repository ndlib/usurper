import React from 'react'
import PropTypes from 'prop-types'
import { searchOptions } from 'constants/searchOptions'

const AdditionalLinks = (props) => {
  const links = []
  let key = 0
  const opt = searchOptions.find((el) => {
    return el.uid === props.currentSearch.uid
  })
  if (opt && opt.enableAdvancedSearch) {
    links.push( // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <a
        onClick={props.toggleAdvancedSearch}
        onKeyDown={props.toggleAdvancedSearch}
        tabIndex='0'
        key={key++}
        className='advanced-basic-toggle'
      >{props.advancedButtonLabel}</a>
    )
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

AdditionalLinks.propTypes = {
  toggleAdvancedSearch: PropTypes.func,
  advancedButtonLabel: PropTypes.string,
  currentSearch: PropTypes.object,
}

export default AdditionalLinks
