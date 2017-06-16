import React from 'react'
import PropTypes from 'prop-types'
import SearchProgramaticSet from '../SearchProgramaticSet'
import PageTitle from '../PageTitle'

const LandingPage = (props) => {
  return (
    <div>
      <SearchProgramaticSet open={false} />
      <PageTitle title={props.title} />
      {props.children}
    </div>
  )
}

LandingPage.propTypes = {
  title: PropTypes.string.isRequired,
}
export default LandingPage
