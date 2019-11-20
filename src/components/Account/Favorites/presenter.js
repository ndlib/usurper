import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AccountPageWrapper from '../AccountPageWrapper'
import NoFavorites from './NoFavorites'
import ManageFavorites from './ManageFavorites'
import PickUp from './PickUp'
import HomePageDisplay from './HomePageDisplay'
import InlineLoading from 'components/Messages/InlineLoading'
import SideNav from 'components/Layout/Navigation/SideNav'

import * as statuses from 'constants/APIStatuses'

import { KIND } from 'actions/personal/favorites'

import styles from './style.module.css'

const Presenter = (props) => {
  const dbItems = typy(props, 'dbFavorites.items').isArray ? props.dbFavorites.items : []
  const subjectItems = typy(props, 'subjectFavorites.items').isArray ? props.subjectFavorites.items : []
  const loading = (props.favoritesStatus === statuses.NOT_FETCHED || props.favoritesStatus === statuses.FETCHING)
  const sidebar = (
    <SideNav className='side-nav-bg' offset={130}>
      <ul>
        { dbItems.length || subjectItems.length ? (
          <React.Fragment>
            <a className='side-anchors' href={'#manage_' + KIND.databases}><li>Databases</li></a>
            <a className='side-anchors' href={'#manage_' + KIND.subjects}><li>Subjects</li></a>
          </React.Fragment>
        ) : (
          <a className='side-anchors' href={'#manage_favorites'}><li>Favorites</li></a>
        )}
        <a className='side-anchors' href={'#preferredLocation'}><li>Preferred Location</li></a>
        <a className='side-anchors' href={'#homePageDisplay'}><li>Home Page Display</li></a>
      </ul>
    </SideNav>
  )

  const clearAllConfirm = () => {
    if (window.confirm('Continuing will delete all of your favorites and reset settings to their default values. Do you wish to continue?')) {
      props.clearAll()
    }
  }

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
        <PickUp entries={props.homeLibraries} defaultValue={props.selectedLocation} updateStatus={props.libraryUpdateStatus} key={props.selectedLocation} />
      ) : (
        <InlineLoading />
      )}
      { !props.homePageDisplayLoading ? (
        <HomePageDisplay hideFavorites={props.hideFavorites} defaultSearch={props.defaultSearch} cookies={props.cookies} />
      ) : (
        <InlineLoading />
      )}
      { !loading && (
        <button className={'button callout ' + styles.clearFavorites} onClick={clearAllConfirm}>Clear All Favorites</button>
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
  clearAll: PropTypes.func,
}

export default Presenter
