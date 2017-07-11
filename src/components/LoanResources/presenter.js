'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './resourceList'
import Link from '../Link'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending

  return (
    <div key='LoanResources' className='resources-list'>
      <h3>Checked out</h3>
      <ResourceList list={have.items} emptyText={have.emptyText} loading={have.loading} />
      <br />
      <h3>Pending</h3>
      <ResourceList list={pending.items} emptyText={pending.emptyText} loading={pending.loading} />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
}

export default LoanResources
