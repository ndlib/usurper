import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'

import Link from 'components/Interactive/Link'
import HomePageHours from 'components/Hours/HomePage'
import TopSection from './TopSection'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import News from './News'
import Events from './Events'
import Reserves from 'static/images/reserves.jpg'
import Account from 'static/images/myaccount.jpg'
import Room from 'static/images/reserveroom.jpg'
import Tech from 'static/images/tech.jpg'
import Find from 'static/images/subjects.jpg'
import OpenGraph from 'components/OpenGraph'
import { HIDE_HOME_FAVORITES } from 'constants/cookies'

import Config from 'shared/Configuration'

class Home extends Component {
  render () {
    const cookie = this.props.cookies.get(HIDE_HOME_FAVORITES)
    const hideFavorites = !!(cookie && cookie == 'true') // eslint-disable-line eqeqeq
    return (
      <div className='Home main'>
        <OpenGraph
          type='website'
        />
        <PageTitle title='Hesburgh Libraries' hideInPage />
        <SearchProgramaticSet open />
        { Config.features.favoritesEnabled ? (
          <TopSection {...this.props} hideFavoritesCookie={hideFavorites} />
        ) : (
          <HomePageHours />
        )}

        <h2 className='skiplink'>Quicklinks</h2>
        <section className=' services hservices' aria-label='Quicklinks' role='navigation'>
          <div className='-col-sm-3 -col-xs-6 one'>
            <Link to='/items-requests' title='My Account'><img src={Account} alt='' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 two'>
            <Link to='/courses' title='Course Reserves'><img src={Reserves} alt='' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 three'>
            <Link to='/subjects' title='Subjects A-Z' noTarget><img src={Find} alt='' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 four'>
            <Link to='http://nd.libcal.com/#s-lc-box-2749-container-tab1' title='Reserve a Room'>
              <img src={Room} alt='' aria-hidden />
            </Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 five'>
            <Link to='/technology-lending' title='Technology Lending'><img src={Tech} alt='' aria-hidden /></Link>
          </div>
        </section>
        <div className='row news'>
          <News {...this.props} />
          <span className='col-md-1' />
          <Events {...this.props} />
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  location: PropTypes.object,
  cookies: PropTypes.any.isRequired,
}

export default Home
