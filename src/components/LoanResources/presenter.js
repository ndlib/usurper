'use strict'
import React from 'react'
import PropTypes from 'prop-types'

import ResourceList from './ResourceList'

const LoanResources = (props) => {
  let have = props.resources.have
  let pending = props.resources.pending

  return (
    <div key='LoanResources' className='resources-list'>
      <h3>{ pending.items.length + ' Items Pending' }</h3>
      <ResourceList
        list={pending.items}
        emptyText={pending.emptyText}
        loading={pending.loading}
        alephId={props.alephId}
        renewal={props.renewal}
        borrowed={false}
        listType='Pending'
      />
      <br />
      <h3>{ have.items.length + ' Items Checked Out'}</h3>
      <ResourceList
        list={have.items}
        emptyText={have.emptyText}
        loading={have.loading}
        alephId={props.alephId}
        renewal={props.renewal}
        borrowed={true}
        listType='Checked Out'
      />
    </div>
  )
}

LoanResources.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  alephId: PropTypes.string,
}

export default LoanResources
