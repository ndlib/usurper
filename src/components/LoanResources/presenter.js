'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending

  let alephId = props.user ? props.user.alephId : null

  return (
    <div key='LoanResources' className='resources-list'>
      <h3>Pending</h3>
      <ResourceList
        list={pending.items}
        emptyText={pending.emptyText}
        loading={pending.loading}
        alephId={alephId}
        renewal={props.renewal}
        borrowed={false}
      />
      <br />
      <h3>Checked out</h3>
      <ResourceList
        list={have.items}
        emptyText={have.emptyText}
        loading={have.loading}
        alephId={alephId}
        renewal={props.renewal}
        borrowed={true}
      />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  user: PropTypes.object,
}

export default LoanResources
