import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { renewAleph, receiveRenewal } from 'actions/personal/alephRenewal'
import Loading from 'components/Messages/InlineLoading'
import Presenter from './presenter'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

const filterFields = [
  'title',
  'published',
  'author',
  'dueDate',
  'returnDate',
  'loanDate',
]

const secondarySort = 'title'

class ListContainer extends Component {
  constructor (props) {
    super(props)
    try {
      this.state = {
        filterValue: '',
        itemList: this.props.list,
        filteredList: helper.filterAndSort(this.props.list, filterFields, '', 'title', 'asc'),
        sortValue: 'title',
        sortDir: 'asc',
        assistText: '',
      }
    } catch (e) {
      console.log(e)
    }

    this.filterChange = this.filterChange.bind(this)
    this.sortChange = this.sortChange.bind(this)
    this.sortClass = this.sortClass.bind(this)
    this.getSortDirAfterClick = this.getSortDirAfterClick.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!this.state.itemList || (nextProps.list && this.state.itemList.length !== nextProps.list.length)) {
      this.setState({
        itemList: nextProps.list,
        filteredList: helper.filterAndSort(nextProps.list, filterFields, this.state.filterValue,
          [this.state.sortValue, secondarySort], this.state.sortDir),
      })
    }
  }

  filterChange (event) {
    let assistText = this.state.filteredList.length + ' ' + this.props.listType + ' items found'
    if (event.target.value) {
      assistText += ' for ' + event.target.value
    }

    this.setState({
      filterValue: event.target.value,
      filteredList: helper.filterAndSort(this.state.itemList, filterFields, event.target.value,
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
      filteredList: helper.filterAndSort(this.state.itemList, filterFields, this.state.filterValue,
        [sortValue, secondarySort], sortDir),
    })
  }

  sortClass (data) {
    return 'sort-' + data + ' ' + (this.state.sortValue === data ? 'sort-' + this.state.sortDir : 'sort-none')
  }

  getSortDirAfterClick (type) {
    const stateDir = this.state.sortDir === 'desc' ? 'ascending' : 'descending'
    return this.state.sortValue === type ? stateDir : 'descending'
  }

  render () {
    if (this.props.loading && (!this.state.itemList || this.state.itemList.length === 0)) {
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
      canRenew={this.props.canRenew}
      sortClick={this.sortChange}
      sortClass={this.sortClass}
      assistSortDirection={this.getSortDirAfterClick}
      loadingMore={this.props.loading}
      listType={this.props.listType}
      assistText={this.state.assistText}
      deleteFromHistory={this.props.deleteFromHistory}
      historical={this.props.historical}
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
    renewAll: () => {
      // renew all aleph items
      ownProps.list.forEach((item) => {
        if (item.barcode) {
          dispatch(renewAleph(item.barcode, ownProps.alephId))
        }
      })
      // set renewal of illiad items
      dispatch(receiveRenewal(undefined, statuses.SUCCESS, { statusText: 'Please view item in ILL to renew' }))
    },
  }
}

ListContainer.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  alephId: PropTypes.string,
  renewal: PropTypes.object,
  canRenew: PropTypes.bool,
  borrowed: PropTypes.bool,
  listType: PropTypes.string.isRequired,
  deleteFromHistory: PropTypes.bool,
  historical: PropTypes.bool,

  // from mappers
  renewAll: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
