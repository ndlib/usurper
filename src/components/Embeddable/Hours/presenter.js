import React from 'react'
import PropTypes from 'prop-types'
import CurrentHours from './Current'

const Presenter = ({ availableServicePoints, servicePointID }) => {
  let sp = availableServicePoints[servicePointID]
  if (!sp) {
    console.log(`${servicePointID} is not a valid service point.`)
    return null
  }

  return (
    <CurrentHours servicePoint={sp} />
  )
}

Presenter.propTypes = {
  availableServicePoints: PropTypes.array.isRequired,
  servicePointID: PropTypes.string.isRequired,
}

export default Presenter
