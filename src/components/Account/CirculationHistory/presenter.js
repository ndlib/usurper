import React from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import ResourceList from '../ResourceList'
import OptedOut from './OptedOut'

const CirculationHistory = (props) => {
  return (
    <AccountPageWrapper title='Checkout History' slug='checkout-history' className='resources-list'>
      { props.optedIn || props.loading
        ? <ResourceList list={props.items} loading={props.loading} type='history' />
        : <OptedOut />
      }
    </AccountPageWrapper>
  )
}

CirculationHistory.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  optedIn: PropTypes.bool,
}

export default CirculationHistory
