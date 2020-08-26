import React from 'react'
import PropTypes from 'prop-types'

import RadioList from 'components/Interactive/RadioList'

import { searchOptions } from 'constants/searchOptions.js'

const DefaultSearch = (props) => {
  return (
    <React.Fragment>
      <h4>Default Search</h4>
      <RadioList
        radioName='defaultSearch'
        entries={searchOptions.map((option) => ({
          title: option.title,
          value: option.uid,
        }))}
        defaultValue={props.defaultValue}
        onChangeCallback={props.onChange}
      />
    </React.Fragment>
  )
}

DefaultSearch.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
}

export default DefaultSearch
