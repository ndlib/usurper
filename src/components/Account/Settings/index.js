import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import {
  setHomeLibrary,
  getCircStatus,
  setCircStatus,
  KIND,
} from 'actions/personal/settings'

import * as states from 'constants/APIStatuses'

const homeLibraries = [
  { value: 'HESB', title: 'Hesburgh Library' },
  { value: 'ARCHT', title: 'Architecture Library' },
  { value: 'BIC', title: 'Business Library' },
  { value: 'CHEMP', title: 'Chemistry ‐ Physics Library' },
  { value: 'ENGIN', title: 'Engineering Library' },
  { value: 'MATH', title: 'Mathematics Library' },
  { value: 'MUSIC', title: 'Music Library' },
  { value: 'NDCAM', title: 'I would prefer departmental delivery' },
]

export const SettingsContainer = (props) => {
  return (
    <Presenter
      homeLibraries={homeLibraries}
      setHomeLibrary={props.setHomeLibrary}
      homeIndex={props.homeIndex}
      libraryStatus={props.libraryStatus}
      setCircStatus={props.setCircStatus}
      getCircStatus={props.getCircStatus}
    />
  )
}

export const mapStateToProps = (state) => {
  const { personal, settings } = state

  const currentHomeTitle = personal.user ? personal.user.homeLibrary : null
  let homeIndex = null
  if (currentHomeTitle) {
    const libraryName = currentHomeTitle.split(' ')[0]
    for (let i = 0; i < homeLibraries.length; ++i) {
      if (homeLibraries[i].title.includes(libraryName)) {
        homeIndex = i
        break
      }
    }
  }

  const libraryState = (settings && settings[KIND.homeLibrary]) ? settings[KIND.homeLibrary].state : states.NOT_FETCHED

  return {
    homeIndex: homeIndex,
    libraryStatus: libraryState,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setHomeLibrary,
    getCircStatus,
    setCircStatus,
  }, dispatch)
}

SettingsContainer.propTypes = {
  setHomeLibrary: PropTypes.func,
  homeIndex: PropTypes.number,
  setCircStatus: PropTypes.func,
  getCircStatus: PropTypes.func,
  libraryStatus: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
