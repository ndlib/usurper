import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter'

import * as helper from 'constants/HelperFunctions'

export class Facet extends Component {
  constructor (props) {
    super(props)

    this.onFacetChange = this.onFacetChange.bind(this)
  }

  onFacetChange (changed) {
    const newValues = JSON.parse(JSON.stringify(this.props.selectedValues))
    const existingIndex = newValues.indexOf(changed.key)
    if (existingIndex >= 0) {
      newValues.splice(existingIndex, 1)
    } else {
      newValues.push(changed.key)
    }

    this.props.onChangeCallback(this.props.name.toLowerCase(), newValues)
  }

  render () {
    const sortBy = this.props.sortBy || 'value'
    const sortDir = (this.props.sortDir === 'desc' ? 'desc' : 'asc')
    const displayOptions = helper.sortList(this.props.options, sortBy, sortDir).map(option => ({
      key: option.key,
      value: option.value,
      selected: this.props.selectedValues.includes(option.key),
    }))

    return (
      <Presenter
        label={this.props.label || helper.titleCase(this.props.name)}
        options={displayOptions}
        onFacetChange={this.onFacetChange}
      />
    )
  }
}

Facet.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChangeCallback: PropTypes.func.isRequired,
}

export default Facet
