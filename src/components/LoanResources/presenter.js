'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './resourceList'

const LoanResources = (props) => {
  return (
    <div key='LoanResources' className='resources-list'>
      <h3>Checked out</h3>
      <ResourceList list={props.resources.have.items} emptyText={props.resources.have.emptyText} />
      <br />
      <h3>Pending</h3>
      <ResourceList list={props.resources.pending.items} emptyText={props.resources.pending.emptyText} />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
}

export default LoanResources
