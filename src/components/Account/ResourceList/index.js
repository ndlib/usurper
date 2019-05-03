import React, { Component } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import * as helper from 'constants/HelperFunctions'
import typeConstants from './constants'

const secondarySort = 'title'

class ResourceListContainer extends Component {
  constructor (props) {
    super(props)

    this.filterFields = ['title', 'published', ...Object.keys(typeConstants[props.type].columns)]

    this.state = {
      filterValue: '',
      itemList: this.props.list,
      filteredList: helper.filterAndSort(props.list, this.filterFields, '', 'title', 'asc'),
      sortValue: 'title',
      sortDir: 'asc',
      assistText: '',
    }

    this.filterChange = this.filterChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.itemList || (nextProps.list && this.state.itemList !== nextProps.list)) {
      this.setState({
        itemList: nextProps.list,
        filteredList: helper.filterAndSort(nextProps.list, this.filterFields, this.state.filterValue,
          [this.state.sortValue, secondarySort], this.state.sortDir),
      })
    }
  }

  filterChange (event) {
    let assistText = this.state.filteredList.length + ' ' + typeConstants[this.props.type].displayName + ' items found'
    if (event.target.value) {
      assistText += ' for ' + event.target.value
    }

    this.setState({
      filterValue: event.target.value,
      filteredList: helper.filterAndSort(this.state.itemList, this.filterFields, event.target.value,
        [this.state.sortValue, secondarySort], this.state.sortDir),
      assistText: assistText,
    })

    // remove assist text after a short delay
    setTimeout(() => {
      this.setState({
        assistText: '',
      })
    }, 1500)
  }

  sortChange (event, sortField) {
    let sortDir = this.state.sortDir
    const sortValue = sortField
    if (sortField === this.state.sortValue) {
      sortDir = this.state.sortDir === 'desc' ? 'asc' : 'desc'
    } else {
      sortDir = 'asc'
    }

    this.setState({
      sortDir: sortDir,
      sortValue: sortValue,
      filteredList: helper.filterAndSort(this.state.itemList, this.filterFields, this.state.filterValue,
        [sortValue, secondarySort], sortDir),
    })
  }

  render () {
    return <Presenter
      filterValue={this.state.filterValue}
      filterChange={this.filterChange}
      count={typy(this.state, 'itemList.length').safeNumber}
      list={this.state.filteredList}
      sortClick={this.sortChange}
      sortValue={this.state.sortValue}
      sortDir={this.state.sortDir}
      loading={this.props.loading}
      assistText={this.state.assistText}
      listType={this.props.type}
    />
  }
}

ResourceListContainer.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array.isRequired,
  type: PropTypes.oneOf(['borrowed', 'pending', 'history']).isRequired,
}

export default ResourceListContainer
