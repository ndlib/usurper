import React from 'react'
import { connect } from 'react-redux'
import { withErrorBoundary } from '../ErrorBoundary'
import Recommendations from './presenter'

const mapStateToProps = (state) => {
  const { personal } = state
  return { recommend: personal.recommend }
}

const RecommendationComponent = connect(mapStateToProps)(Recommendations)
export default withErrorBoundary(RecommendationComponent)
