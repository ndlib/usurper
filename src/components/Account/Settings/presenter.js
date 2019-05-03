import React from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import CircOptIn from './CircOptIn'

const Presenter = (props) => {
  return (
    <AccountPageWrapper title='Settings' slug='settings' className='settings'>
      <CircOptIn
        setCircStatus={props.setCircStatus}
        getCircStatus={props.getCircStatus}
      />
    </AccountPageWrapper>
  )
}

Presenter.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
}

export default Presenter
