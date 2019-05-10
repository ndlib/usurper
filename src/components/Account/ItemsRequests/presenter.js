import React from 'react'
import PropTypes from 'prop-types'

import AccountPageWrapper from '../AccountPageWrapper'
import ResourceList from '../ResourceList'
import AccountBalance from './AccountBalance'
import AccountError from './AccountError'
import AccountExpired from './AccountExpired'

import InlineLoading from 'components/Messages/InlineLoading'
import * as statuses from 'constants/APIStatuses'

const ItemsRequests = (props) => {
  const have = props.resources.have
  const pending = props.resources.pending

  return (
    <AccountPageWrapper title='Items &amp; Requests' slug='personal' className='resources-list'>
      { props.userLoading ? (
        <InlineLoading title='Loading account info' />
      ) : (
        <React.Fragment>
          <AccountBalance balance={props.balance} />
          { props.userStatus === statuses.ERROR ? <AccountError /> : null }
          { props.userExpired ? <AccountExpired /> : null }
          <ResourceList list={pending.items} loading={pending.loading} type='pending' />
          <br />
          <ResourceList list={have.items} loading={have.loading} type='borrowed' />
        </React.Fragment>
      )}
    </AccountPageWrapper>
  )
}

ItemsRequests.propTypes = {
  balance: PropTypes.number,
  resources: PropTypes.object,
  userLoading: PropTypes.bool,
  userStatus: PropTypes.string,
  userExpired: PropTypes.bool,
}

export default ItemsRequests
