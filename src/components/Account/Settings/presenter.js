import React from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import PickUp from './PickUp'
import HomePageDisplay from './HomePageDisplay'
import InlineLoading from 'components/Messages/InlineLoading'

import Config from 'shared/Configuration'

const Presenter = (props) => {
  return (
    <AccountPageWrapper title='Settings' slug='settings' className='settings'>
      { Config.features.favoritesEnabled && (
        (props.homeLibraries && props.selectedLocation) ? (
          <PickUp entries={props.homeLibraries} defaultValue={props.selectedLocation} updateStatus={props.libraryUpdateStatus} />
        ) : (
          <InlineLoading />
        )
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
  homeLibraries: PropTypes.array,
  selectedLocation: PropTypes.string,
  libraryUpdateStatus: PropTypes.string,
  hideFavorites: PropTypes.bool.isRequired,
  homePageDisplayLoading: PropTypes.bool.isRequired,
  cookies: PropTypes.any,
  defaultSearch: PropTypes.string.isRequired,
}

export default Presenter
