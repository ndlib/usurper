import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Loading from 'components/Messages/Loading'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import FilterOptions from '../FilterOptions'
import * as statuses from 'constants/APIStatuses'

import styles from '../style.module.css'

const Presenter = (props) => {
  const isUpdating = (props.updateStatus === statuses.FETCHING)
  const updateText = (() => {
    switch (props.updateStatus) {
      case statuses.SUCCESS:
        return props.isEdit
          ? 'Successfully updated subscription preferences.'
          : 'Thank you for subscribing. Please verify your email address to begin receiving emails.'
      case statuses.ERROR:
        return 'An error occurred. Please refresh and try again.'
      case statuses.UNAUTHORIZED:
        return props.isEdit
          ? 'Update failed. Please click on the link from your email to update email preferences.'
          : 'This email address is already subscribed. Please click on the link from your email to update preferences.'
      default:
        return null
    }
  })()

  return (
    <div className='content'>
      <PageTitle title='Subscribe to Events' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 col-xs-12'>
          {(props.isEdit && [statuses.NOT_FETCHED, statuses.FETCHING].includes(props.fetchStatus)) ? (
            <Loading />
          ) : (
            <form onSubmit={props.onSubmit}>
              <FilterOptions selectedOptions={props.selectedOptions} onOptionChange={props.onOptionChange} />
              <div className={styles.formGroup}>
                <h2 className={styles.formGroupHeader}>
                  Frequency of Email
                </h2>
                <div className={styles.optionList}>
                  <select value={props.frequency} onChange={props.onFrequencyChange}>
                    <option value={1}>Daily</option>
                    <option value={7}>Weekly</option>
                    <option value={14}>Every 2 weeks</option>
                    <option value={30}>Monthly</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <h2 className={styles.formGroupHeader}>
                  Email Address
                </h2>
                <div className={styles.optionList}>
                  <input type='email' onChange={props.onEmailChange} value={props.email || ''} disabled={props.isEdit} required />
                </div>
              </div>
              <button className={`button ${styles.subscribeButton}`} type='submit' disabled={isUpdating}>
                {props.isEdit ? 'Update Subscription' : 'Subscribe'}
              </button>
              {isUpdating ? (
                <InlineLoading title='Updating... Please wait.' />
              ) : (
                <UpdateStatus status={props.updateStatus} text={updateText} />
              )}
            </form>
          )}
        </div>
        <div className='col-md-4 col-sm-5 col-xs-12 right landing-page-sidebar'>
          {/* nothing here at the moment */}
        </div>
      </div>
    </div>
  )
}

Presenter.propTypes = {
  selectedOptions: PropTypes.object,
  frequency: PropTypes.number,
  email: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired,
  onFrequencyChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  fetchStatus: PropTypes.string,
  updateStatus: PropTypes.string,
}

export default Presenter
