import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchProgramaticSet extends Component {
  componentWillMount () {
    this.props.onGetProps(this.props.open)
  }

  componentWillReceiveProps (nextProps) {
    this.props.onGetProps(nextProps.open)
  }

  render () {
    return (<span style={{ display: 'none' }} />)
  }
}

SearchProgramaticSet.propTypes = {
  onGetProps: PropTypes.func.isRequired,
  open: PropTypes.bool,
}

export default SearchProgramaticSet
