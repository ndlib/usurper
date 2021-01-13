import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import FilterOptions from '../FilterOptions'

import styles from '../style.module.css'

const Presenter = (props) => {
  return (
    <div className='content'>
      <PageTitle title='Subscribe to Events' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 col-xs-12'>
          <form onSubmit={props.onSubmit}>
            <FilterOptions selectedOptions={props.selectedOptions} onOptionChange={props.onOptionChange} />
            <div className={styles.formGroup}>
              <h2 className={styles.formGroupHeader}>
                Frequency of Email
              </h2>
              <div className={styles.optionList}>
                <select value={props.frequency} onChange={props.onFrequencyChange}>
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='2weeks'>Every 2 weeks</option>
                  <option value='monthly'>Monthly</option>
                </select>
              </div>
            </div>
            <div className={styles.formGroup}>
              <h2 className={styles.formGroupHeader}>
                Email Address
              </h2>
              <div className={styles.optionList}>
                <input type='email' onChange={props.onEmailChange} value={props.email} required />
              </div>
            </div>
            <button className={`button ${styles.subscribeButton}`} type='submit'>Subscribe</button>
          </form>
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
  frequency: PropTypes.string,
  email: PropTypes.string,
  onOptionChange: PropTypes.func.isRequired,
  onFrequencyChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default Presenter
