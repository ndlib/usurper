import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import NoFavorites from 'components/Account/Preferences/NoFavorites'
import TopFavorites from 'components/Account/Preferences/TopFavorites'
import ServicePoint from 'components/Contentful/ServicePoint'
import PageLink from 'components/Contentful/PageLink'
import InlineLoading from 'components/Messages/InlineLoading'
import HomePageHours from 'components/Hours/HomePage'
import Config from 'shared/Configuration'

const TopSection = (props) => {
  const servicePoint = typy(props.servicePoint).isString ? (
    <ServicePoint slug={props.servicePoint} page={props.page} />
  ) : (
    <ServicePoint cfServicePoint={props.servicePoint} page={props.page} />
  )
  return (
    <div className='row'>
      { props.showFavorites ? (
        <React.Fragment>
          <div className='col-xs-12 col-sm-7 col-md-8'>
            { props.favoritesLoading ? (
              <InlineLoading />
            ) : (
              props.hasItems ? <TopFavorites favorites={props.favorites} /> : <NoFavorites isHomePage cookies={props.cookies} />
            )}
          </div>
          <div className={`col-xs-12 col-sm-5 col-md-4 right ${props.locationClassName}`}>
            { props.locationLoading ? (
              <InlineLoading />
            ) : (
              <React.Fragment>
                {servicePoint}
                <PageLink className='button callout' cfPage={props.calloutLink} />
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      ) : (
        <div style={{ width: '100%', marginBottom: (Config.features.exhibitsEnabled ? '40px' : '10px') }}>
          {props.locationLoading ? <InlineLoading /> : <HomePageHours />}
        </div>
      )}
    </div>
  )
}

TopSection.propTypes = {
  showFavorites: PropTypes.bool,
  favoritesLoading: PropTypes.bool,
  locationLoading: PropTypes.bool,
  hasItems: PropTypes.bool,
  locationClassName: PropTypes.string,
  servicePoint: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  calloutLink: PropTypes.object,
  favorites: PropTypes.object,
  cookies: PropTypes.any,
  page: PropTypes.object,
}

export default TopSection
