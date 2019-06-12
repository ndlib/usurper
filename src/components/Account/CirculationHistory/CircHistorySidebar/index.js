import React from 'react'
import PropTypes from 'prop-types'

import PageLink from 'components/Contentful/PageLink'
import Config from 'shared/Configuration'

import styles from './style.module.css'

const CircHistorySidebar = (props) => {
  const calloutLink = {
    fields: {
      title: 'Report a Problem',
      url: `${Config.serviceNowBaseURL}&lib_list_problem=lib_list_general`,
    },
  }

  if (!props.optedIn) {
    return null
  }

  return (
    <aside className={'col-md-4 col-sm-5 col-xs-12 right ' + styles.checkoutHistorySidebar}>
      <button className={'button callout ' + styles.optOutBtn} onClick={props.onClickOptOut}>
        Opt-Out and Delete History
      </button>
      <PageLink className='button callout' cfPage={calloutLink} />
      <h3 id='note'>NOTE:</h3>
      <ul>
        <li>Items may take up to 24 hours to display or update.</li>
        <li>You cannot delete items in your history until 31 days after they are returned.</li>
        <li>ILL records cannot be deleted.</li>
        <li>Deleted items are lost permanently and cannot be restored.</li>
      </ul>
    </aside>
  )
}

CircHistorySidebar.propTypes = {
  optedIn: PropTypes.bool,
  onClickOptOut: PropTypes.func.isRequired,
}

export default CircHistorySidebar
