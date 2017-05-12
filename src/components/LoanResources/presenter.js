'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './resourceList'

const LoanResources = (props) => {
  return (
    <div key='LoanResources' className='resources-list'>
      <div className='alert'>
        <p><strong>Attention:</strong> Renew button on this page is for demonstration purposes only.</p>
      </div>

      <h3>Checked out</h3>
      <ResourceList list={props.resources.have.items} emptyText={'You have no checked out items.'} />
      <br />
      <h3>Pending</h3>
      <ResourceList list={props.resources.pending.items} emptyText={'You have no pending items.'} />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
}

export default LoanResources
