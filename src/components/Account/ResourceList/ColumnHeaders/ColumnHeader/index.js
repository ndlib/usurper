import React, { Component } from 'react'
import PropTypes from 'prop-types'

import typeConstants from '../../constants'

class ColumnHeader extends Component {
  constructor (props) {
    super(props)
    this.sortClass = this.sortClass.bind(this)
    this.assistSortDirection = this.assistSortDirection.bind(this)
  }

  sortClass (field) {
    return 'sort-' + field + ' ' + (this.props.sortValue === field ? 'sort-' + this.props.sortDir : 'sort-none')
  }

  assistSortDirection (field) {
    // Invert the currently sorted direction since this is the text for the button to change the direction
    const stateDir = this.props.sortDir === 'asc' ? 'Descending' : 'Ascending'
    return this.props.sortValue === field ? stateDir : 'Ascending'
  }

  render () {
    const label = `Sort By ${this.props.displayName} ${this.assistSortDirection(this.props.columnKey)}`
    return (
      <button
        key={this.props.columnKey}
        className={`custom-style ${this.sortClass(this.props.columnKey)} ${this.props.className}`}
        onClick={(e) => this.props.sortClick(e, this.props.columnKey)}
        title={label}
        aria-label={label}
        aria-controls={typeConstants[this.props.listType].displayName}
      >
        {this.props.displayName}
      </button>
    )
  }
}

ColumnHeader.propTypes = {
  displayName: PropTypes.string.isRequired,
  columnKey: PropTypes.string.isRequired,
  className: PropTypes.string,
  sortValue: PropTypes.string.isRequired,
  sortDir: PropTypes.string,
  sortClick: PropTypes.func.isRequired,
  listType: PropTypes.string.isRequired,
}

ColumnHeader.defaultProps = {
  sortValue: 'title',
  sortDir: 'asc',
}

export default ColumnHeader
