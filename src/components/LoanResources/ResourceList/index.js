'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { renewAleph } from '../../../actions/personal/alephRenewal'
import Loading from '../../Messages/Loading'
import Presenter from './presenter'

class ListContainer extends Component {
  constructor (props) {
    super(props)
    try {
      this.state = {
        filterValue: '',
        itemList: this.props.list,
        filteredList: this.filter('', 'title', 'desc', this.props.list),
        sortValue: 'title',
        sortDir: 'desc',
      }
    } catch (e) {
      console.log(e)
    }

    this.filterChange = this.filterChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
    this.sortClass = this.sortClass.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.itemList || this.state.itemList.length !== nextProps.list.length) {
      this.setState({
        itemList: nextProps.list,
        filteredList: this.filter(this.state.filterValue, this.state.sortValue, this.state.sortDir, nextProps.list),
      })
    }
  }

  filter (filterValue, sortValue, sortDir, list) {
    const value = filterValue.toLowerCase()
    const filterFields = [
      'title',
      'published',
      'author',
      'pickupLocation',
      'dueDate',
    ]

    const sortOps = {
      asc: (a, b) => {
        if (!a && b) {
          return -1
        } else if (!b && a) {
          return 1
        }
        return -a.localeCompare(b, undefined, { sensitivity: 'accent', ignorePunctuation: true })
      },
      desc: (a, b) => {
        if (!a && b) {
          return 1
        } else if (!b && a) {
          return -1
        }
        return a.localeCompare(b, undefined, { sensitivity: 'accent', ignorePunctuation: true })
      },
    }

    return list.filter((item) => {
      let inFilter = false
      filterFields.forEach((field) => {
        inFilter = inFilter || (item[field] && item[field].toLowerCase().includes(value))
      })
      return inFilter
    }).sort((a, b) => {
      let aValue = a[sortValue]
      let bValue = b[sortValue]

      if (aValue === bValue) {
        return sortOps['desc'](a['title'], b['title'])
      }

      return sortOps[sortDir](aValue, bValue)
    })
  }

  filterChange (event) {
    this.setState({
      filterValue: event.target.value,
      filteredList: this.filter(event.target.value, this.state.sortValue, this.state.sortDir, this.state.itemList),
    })
  }

  sortChange (event, sortField) {
    let sortDir = this.state.sortDir
    let sortValue = sortField
    if (sortField === this.state.sortValue) {
      sortDir = this.state.sortDir === 'desc' ? 'asc' : 'desc'
    } else {
      sortDir = 'desc'
    }

    this.setState({
      sortDir: sortDir,
      sortValue: sortValue,
      filteredList: this.filter(this.state.filterValue, sortValue, sortDir, this.state.itemList),
    })
  }

  sortClass (data) {
    return 'sort-' + data + ' ' + (this.state.sortValue === data ? 'sort-' + this.state.sortDir : 'sort-none')
  }

  render () {
    if (this.props.loading) {
      return <Loading />
    }

    if (!this.state.itemList || this.state.itemList.length === 0) {
      return <div>{this.props.emptyText}</div>
    }

    return <Presenter
      filterValue={this.state.filterValue}
      filterChange={this.filterChange}
      list={this.state.filteredList}
      borrowed={this.props.borrowed}
      alephId={this.props.alephId}
      renewal={this.props.renewal}
      renewAll={this.props.renewAll}
      sortClick={this.sortChange}
      sortClass={this.sortClass}
    />
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    renewAll: (e) => {
      ownProps.list.forEach((item) => {
        if (item.barcode) {
          dispatch(renewAleph(item.barcode, ownProps.alephId))
        }
      })
    },
  }
}

ListContainer.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  alephId: PropTypes.string,
  renewal: PropTypes.object,
  borrowed: PropTypes.bool,

  // from mappers
  renewAll: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
