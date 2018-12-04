'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'
import AccountExpired from '../Messages/AccountExpired'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending
  const expiredMessage = (props.canRenew || props.userLoading) ? null : <AccountExpired />

  return (
    <div key='LoanResources' className='resources-list'>
      { expiredMessage }
      <h3>{ pending.items.length + ' Item' + (pending.items.length !== 1 ? 's' : '') + ' Pending' }</h3>
      <ResourceList
        list={pending.items}
        emptyText={pending.emptyText}
        loading={pending.loading || props.userLoading}
        alephId={props.alephId}
        renewal={props.renewal}
        canRenew={props.canRenew}
        borrowed={false}
        listType='Pending'
      />
      <br />
      <h3>{ have.items.length + ' Item' + (have.items.length !== 1 ? 's' : '') + ' Checked Out'}</h3>
      <ResourceList
        list={have.items}
        emptyText={have.emptyText}
        loading={have.loading || props.userLoading}
        alephId={props.alephId}
        renewal={props.renewal}
        canRenew={props.canRenew}
        borrowed={true}
        listType='Checked Out'
      />
    </div>
  )
}

LoanResources.propTypes = {
  alephId: PropTypes.string,
  renewal: PropTypes.object,
  canRenew: PropTypes.bool,
  userLoading: PropTypes.bool,
  resources: PropTypes.object,
}

export default LoanResources
