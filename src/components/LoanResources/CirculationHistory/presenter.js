import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../PageTitle'
import ResourceList from '../ResourceList'

const CirculationHistory = (props) => {
  let history = props.resources.have

  return (
    <div className='content'>
      <PageTitle title='Circulation History' />
      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <div key='CirculationHistory' className='resources-list'>
            <h3>{ history.items.length + ' Item' + (history.items.length !== 1 ? 's' : '') + ' in Circulation History'}</h3>
            <ResourceList
              list={history.items}
              emptyText={history.emptyText}
              loading={history.loading}
              alephId={props.alephId}
              renewal={props.renewal}
              borrowed
              listType='Circulation History'
              deleteFromHistory
              historical
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CirculationHistory.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  alephId: PropTypes.string,
}

export default CirculationHistory
