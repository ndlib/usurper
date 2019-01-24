'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'
import PageAlert from '../Messages/PageAlert'
import ServiceNowLink from '../ServiceNowLink'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending
  const expiredMessage = (
    <PageAlert type='warning' id='accountExpired'>
      Your library account has expired. Please <ServiceNowLink>contact us</ServiceNowLink> for more information.
    </PageAlert>
  )
  const loadFailed = (
    <PageAlert type='warning' id='userLoadFailed'>
      Unable to load account information. Please refresh the page, or <ServiceNowLink>contact us</ServiceNowLink> if you
      continue to experience issues.
    </PageAlert>
  )

  return (
    <div key='LoanResources' className='resources-list'>
      { (props.expired && !props.userLoading) ? expiredMessage : null }
      { (!props.expired && !props.userLoading && (!props.canRenew || !props.alephId)) ? loadFailed : null }
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
        borrowed
        listType='Checked Out'
      />
    </div>
  )
}

LoanResources.propTypes = {
  alephId: PropTypes.string,
  renewal: PropTypes.object,
  canRenew: PropTypes.bool,
  expired: PropTypes.bool,
  userLoading: PropTypes.bool,
  resources: PropTypes.object,
}

export default LoanResources
