import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SearchProgramaticSet extends Component {
  componentDidMount () {
    this.props.onGetProps(this.props.open)
  }

  componentDidUpdate (prevProps) {
    if (this.props.open !== prevProps.open) {
      this.props.onGetProps(this.props.open)
    }
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
