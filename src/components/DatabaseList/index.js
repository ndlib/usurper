// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLetter } from '../../actions/contentful/databaseLetter'
import PresenterFactory from '../APIPresenterFactory'
import ListPresenter from './presenter.js'
import * as statuses from '../../constants/APIStatuses'
import PageNotFound from '../Messages/NotFound'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')

// Concat all database letters into one big list for searching
const concatDbs = (raw, status) => {
  if (status === statuses.SUCCESS) {
    let out = []
    alphabet.forEach((letter) => {
      if (raw[letter] && raw[letter].data) {
        out = out.concat(raw[letter].data)
      }
    })
    return out
  }
  return []
}

// sort all letters by title alphabetically
const sortDbs = (raw) => {
  if (!raw) {
    return raw
  }

  let out = {}
  Object.keys(raw).forEach((letter) => {
    out[letter] = []
    out[letter]['status'] = raw[letter].status
    if (raw[letter].data) {
      out[letter]['data'] = raw[letter].data.sort(
        (left, right) => {
          let a = left.fields.title.toLowerCase()
          let b = right.fields.title.toLowerCase()

          if (a < b) {
            return -1
          } else if (b < a) {
            return 1
          }
          return 0
        }
      )
    }
  })
  return out
}

const mapStateToProps = (state, thisProps) => {
  let allLettersStatus = statuses.FETCHING
  // get a status for all letters, either error, fetching or success (not found || success = success)
  if (state.cfDatabaseLetter && state.cfDatabaseLetter.a) {
    allLettersStatus = Object.keys(state.cfDatabaseLetter).map((key) => state.cfDatabaseLetter[key].status)
      .reduce((a, b) => {
        let success = (status) => status === statuses.SUCCESS
        let notFound = (status) => status === statuses.NOT_FOUND
        let valid = (status) => success(status) || notFound(status)

        let error = (status) => status === statuses.ERROR
        let fetching = (status) => status === statuses.FETCHING

        if (error(a) || error(b)) {
          return statuses.ERROR
        } else if (fetching(a) || fetching(b)) {
          return statuses.FETCHING
        } else if (valid(a) && valid(b)) {
          return statuses.SUCCESS
        }
      })
  }

  let letterData = sortDbs(state.cfDatabaseLetter)

  return {
    cfDatabaseLetter: letterData,
    allLettersStatus: allLettersStatus,
    allDbs: concatDbs(state.cfDatabaseLetter, allLettersStatus),
    currentLetter: thisProps.match.params.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchLetter }, dispatch)
}

export class DatabaseListContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterValue: '',
      filteredList: [],
    }

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    alphabet.forEach((letter) => {
      this.props.fetchLetter(letter, preview)
    })
  }

  componentWillReceiveProps (nextProps) {
    const slug = this.props.match.params.id
    const nextSlug = nextProps.match.params.id
    if (slug !== nextSlug) {
      this.setState({
        filterValue: '',
      })
    } else {
      this.setState({
        filteredList: this.filter(this.state.filterValue, nextProps.allDbs),
      })
    }
  }

  // only filter by title for now, may want description in the future
  filter (filterValue, list) {
    const value = filterValue.toLowerCase()
    const filterFields = [
      'title',
    ]
    return list.filter((item) => {
      let inFilter = false
      filterFields.forEach((field) => {
        inFilter = inFilter || (item.fields[field] && item.fields[field].toLowerCase().includes(value))
      })
      return inFilter
    }).slice(0, 50)
  }

  onFilterChange (event) {
    this.setState({
      filterValue: event.target.value,
      filteredList: this.filter(event.target.value, this.props.allDbs),
    })
  }

  render () {
    let letter = this.props.currentLetter

    // dont allow going to /foo or /1 etc
    if (letter.length > 1 || letter < 'a' || letter > 'z') {
      return <PageNotFound />
    }

    let status = statuses.FETCHING
    let data = []
    // use status of selected letter
    if (this.props.cfDatabaseLetter[letter]) {
      status = this.props.cfDatabaseLetter[letter].status
      data = this.props.cfDatabaseLetter[letter].data ? this.props.cfDatabaseLetter[letter].data : []
    }

    // if filtering, use status of all letters together, and change title to 'search'
    if (this.state.filterValue) {
      letter = 'search - ' + this.state.filterValue
      status = this.props.allLettersStatus
      data = this.state.filteredList
    }

    return <ListPresenter
      list={data}
      letter={letter}
      status={status}
      filterValue={this.state.filterValue}
      onFilterChange={this.onFilterChange}
    />
  }
}

DatabaseListContainer.propTypes = {
  fetchLetter: PropTypes.func.isRequired,
  currentLetter: PropTypes.string.isRequired,

  cfDatabaseLetter: PropTypes.object.isRequired,
  allLettersStatus: PropTypes.string.isRequired,
}

const DatabaseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseListContainer)

export default DatabaseList
