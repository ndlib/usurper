import React from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import NoFavorites from './NoFavorites'
import ManageFavorites from './ManageFavorites'
import PickUp from './PickUp'
import HomePageDisplay from './HomePageDisplay'
import InlineLoading from 'components/Messages/InlineLoading'
import SideNav from 'components/Layout/Navigation/SideNav'

import * as statuses from 'constants/APIStatuses'

import { KIND } from 'actions/personal/favorites'

const Presenter = (props) => {
  const dbItems = (props.dbFavorites && props.dbFavorites.items) ? props.dbFavorites.items : []
  const subjectItems = (props.subjectFavorites && props.subjectFavorites.items) ? props.subjectFavorites.items : []
  const loading = (props.favoritesStatus === statuses.NOT_FETCHED || props.favoritesStatus === statuses.FETCHING)
  const sidebar = (
    <SideNav className='side-nav-bg'>
      <ul>
        <a className='side-anchors' href={'#manage_' + KIND.databases}><li>Databases</li></a>
        <a className='side-anchors' href={'#manage_' + KIND.subjects}><li>Subjects</li></a>
        <a className='side-anchors' href={'#preferredLocation'}><li>Preferred Location</li></a>
        <a className='side-anchors' href={'#homePageDisplay'}><li>Home Page Display</li></a>
      </ul>
    </SideNav>
  )

  return (
    <AccountPageWrapper title='Favorites' slug='favorites' customSidebar={sidebar}>
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
      { (props.homeLibraries && props.selectedLocation && ![statuses.NOT_FETCHED, statuses.FETCHING].includes(props.cfBranches.status)) ? (
        <PickUp entries={props.homeLibraries} defaultValue={props.selectedLocation} updateStatus={props.libraryUpdateStatus} />
      ) : (
        <InlineLoading />
      )}
      { !props.homePageDisplayLoading ? (
        <HomePageDisplay hideFavorites={props.hideFavorites} defaultSearch={props.defaultSearch} cookies={props.cookies} />
      ) : (
        <InlineLoading />
      )}
    </AccountPageWrapper>
  )
}

Presenter.propTypes = {
  preview: PropTypes.bool,
  dbFavorites: PropTypes.object,
  subjectFavorites: PropTypes.object,
  favoritesStatus: PropTypes.string.isRequired,
  homeLibraries: PropTypes.array,
  selectedLocation: PropTypes.string,
  libraryUpdateStatus: PropTypes.string,
  cfBranches: PropTypes.shape({
    status: PropTypes.string,
  }),
  hideFavorites: PropTypes.bool.isRequired,
  homePageDisplayLoading: PropTypes.bool.isRequired,
  cookies: PropTypes.any,
  defaultSearch: PropTypes.string.isRequired,
}

export default Presenter
