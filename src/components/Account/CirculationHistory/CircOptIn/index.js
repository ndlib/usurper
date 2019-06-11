import React from 'react'
import PropTypes from 'prop-types'

import * as statuses from 'constants/APIStatuses'
import UpdateStatus from 'components/Messages/UpdateStatus'
import PolicyInfo from './PolicyInfo'

import styles from './style.module.css'

const CircOptIn = (props) => {
  const statusText = (props.updateStatus === statuses.SUCCESS)
    ? 'Successfully opted out.'
    : 'Failed to update preference. Please refresh and try again.'

  return (
    <section className={'group ' + styles.optIn}>
      <h3>Checkout History</h3>
      <div className={styles.sectionBox}>
        <span className={styles.optedOutDesc}>Your checkout history is not being saved.</span>
        <button className={'right ' + styles.optInBtn} onClick={props.onClickOptIn}>Opt-in to save history</button>
        <br />
        <UpdateStatus className='pad-edges-sm' status={props.updateStatus} text={statusText} />
      </div>
      <hr />
      <PolicyInfo />
    </section>
  )
}

CircOptIn.propTypes = {
  onClickOptIn: PropTypes.func.isRequired,
  updateStatus: PropTypes.string.isRequired,
}
export default CircOptIn
