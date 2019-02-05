import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../PageTitle'
import ResourceList from '../ResourceList'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import UserMenu from '../../Navigation/UserMenu'
import Link from '../../Link'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'

const CirculationHistory = (props) => {
  let history = props.resources.have

  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Checkout History' />} />
      <PageTitle title='Checkout History' hideInPage />

      <div className='row'>
        <div className='col-xs-12 col-md-8'>
          <div key='CirculationHistory' className='resources-list'>
            <h3>{ `${history.items.length} Item${(history.items.length !== 1 ? 's' : '')} in Checkout History` }</h3>
            { props.optedIn || history.loading
              ? (
                <ResourceList
                  list={history.items}
                  emptyText={history.emptyText}
                  loading={history.loading}
                  alephId={props.alephId}
                  renewal={props.renewal}
                  borrowed
                  listType='Checkout History'
                  deleteFromHistory
                  historical
                />
              )
              : (
                <div>
                  You must <Link to='/settings'>opt-in to save checkout history</Link> first.
                </div>
              )
            }
          </div>
        </div>
        <StaticSidebar slug='checkout-history' preview={props.preview} />
      </div>
    </div>
  )
}

CirculationHistory.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  alephId: PropTypes.string,
  optedIn: PropTypes.bool,
  preview: PropTypes.bool,
}

export default CirculationHistory
