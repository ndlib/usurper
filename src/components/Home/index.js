import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'

import TopSection from './TopSection'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import News from './News'
import Events from './Events'
import Exhibits from './Exhibits'
import FeaturedServices from './FeaturedServices'
import OpenGraph from 'components/OpenGraph'
import { HIDE_HOME_FAVORITES } from 'constants/cookies'

import './style.css'

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
        <FeaturedServices />
        <div className='container-fluid content'>
          <span id='top' />
          <TopSection {...this.props} hideFavoritesCookie={hideFavorites} />
        </div>
        <div className='exhibitsContainer'>
          <div className='container-fluid content'>
            <Exhibits {...this.props} />
          </div>
        </div>
        <div className='container-fluid content'>
          <div className='row news'>
            <News {...this.props} />
            <span className='col-md-1' />
            <Events {...this.props} />
          </div>
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
