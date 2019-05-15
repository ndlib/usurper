import React from 'react'
import PropTypes from 'prop-types'

import NoFavorites from 'components/Account/Favorites/NoFavorites'
import TopFavorites from 'components/Account/Favorites/TopFavorites'
import ServicePoint from 'components/Contentful/ServicePoint'
import PageLink from 'components/Contentful/PageLink'
import InlineLoading from 'components/Messages/InlineLoading'

const TopSection = (props) => {
  return (
    <div className='row'>
      { props.showFavorites && (
        <div className='col-xs-12 col-sm-7 col-md-8'>
          { props.favoritesLoading ? (
            <InlineLoading />
          ) : (
            props.hasItems ? <TopFavorites favorites={props.favorites} /> : <NoFavorites isHomePage cookies={props.cookies} />
          )}
        </div>
      )}
      <div className={`col-xs-12 col-sm-5 col-md-4 right ${props.locationClassName}`}>
        { props.locationLoading ? (
          <InlineLoading />
        ) : (
          <React.Fragment>
            <ServicePoint cfServicePoint={props.servicePoint} />
            <PageLink className='button callout' cfPage={props.calloutLink} />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

TopSection.propTypes = {
  showFavorites: PropTypes.bool,
  favoritesLoading: PropTypes.bool,
  locationLoading: PropTypes.bool,
  hasItems: PropTypes.bool,
  locationClassName: PropTypes.string,
  servicePoint: PropTypes.object,
  calloutLink: PropTypes.object,
  favorites: PropTypes.object,
  cookies: PropTypes.any,
}

export default TopSection
