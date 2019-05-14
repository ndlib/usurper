import React from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import NoFavorites from './NoFavorites'
import ManageFavorites from './ManageFavorites'
import InlineLoading from 'components/Messages/InlineLoading'

import * as statuses from 'constants/APIStatuses'

import { KIND } from 'actions/personal/favorites'

const Presenter = (props) => {
  const dbItems = (props.dbFavorites && props.dbFavorites.items) ? props.dbFavorites.items : []
  const subjectItems = (props.subjectFavorites && props.subjectFavorites.items) ? props.subjectFavorites.items : []
  const loading = (props.favoritesStatus === statuses.NOT_FETCHED || props.favoritesStatus === statuses.FETCHING)

  return (
    <AccountPageWrapper title='Favorites' slug='favorites'>
      { (loading || dbItems.length || subjectItems.length) ? (
        <React.Fragment>
          { (!props.dbFavorites || props.dbFavorites.state === statuses.FETCHING) ? (
            <InlineLoading className='pad-edges-sm' />
          ) : (
            <ManageFavorites kind={KIND.databases} items={dbItems} />
          )}
          { (!props.subjectFavorites || props.subjectFavorites.state === statuses.FETCHING) ? (
            <InlineLoading className='pad-edges-sm' />
          ) : (
            <ManageFavorites kind={KIND.subjects} items={subjectItems} />
          )}
        </React.Fragment>
      ) : (
        <NoFavorites preview={props.preview} />
      )}
    </AccountPageWrapper>
  )
}

Presenter.propTypes = {
  preview: PropTypes.bool,
  dbFavorites: PropTypes.object,
  subjectFavorites: PropTypes.object,
  favoritesStatus: PropTypes.string.isRequired,
}

export default Presenter
