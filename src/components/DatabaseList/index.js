// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchLetter } from 'actions/contentful/databaseLetter'
import ListPresenter from './presenter.js'
import * as statuses from 'constants/APIStatuses'
import PageNotFound from 'components/Messages/NotFound'
import { withErrorBoundary } from 'components/ErrorBoundary'

const alphabet = 'abcdefghijklmnopqrstuvwxyz#'.split('')

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

  const out = {}
  Object.keys(raw).forEach((letter) => {
    out[letter] = []
    out[letter]['status'] = raw[letter].status
    if (raw[letter].data) {
      out[letter]['data'] = raw[letter].data.sort(
        (left, right) => {
          const a = left.fields.title.toLowerCase()
          const b = right.fields.title.toLowerCase()

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
  let allLettersStatus = statuses.NOT_FETCHED
  // get a status for all letters, either error, fetching or success (not found || success = success)
  if (state.cfDatabaseLetter && state.cfDatabaseLetter.a) {
    allLettersStatus = Object.keys(state.cfDatabaseLetter).map((key) => state.cfDatabaseLetter[key].status)
      .reduce((a, b) => {
        const success = (status) => status === statuses.SUCCESS
        const notFound = (status) => status === statuses.NOT_FOUND
        const valid = (status) => success(status) || notFound(status)

        const error = (status) => status === statuses.ERROR
        const fetching = (status) => status === statuses.FETCHING

        if (error(a) || error(b)) {
          return statuses.ERROR
        } else if (fetching(a) || fetching(b)) {
          return statuses.FETCHING
        } else if (valid(a) && valid(b)) {
          return statuses.SUCCESS
        }
        return statuses.ERROR
      })
  }

  const letterData = sortDbs(state.cfDatabaseLetter)

  return {
    cfDatabaseLetter: letterData,
    allLettersStatus: allLettersStatus,
    allDbs: concatDbs(state.cfDatabaseLetter, allLettersStatus),
    currentLetter: decodeURIComponent(thisProps.match.params.id),
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
      assistText: '',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    if (this.props.allLettersStatus === statuses.NOT_FETCHED) {
      alphabet.forEach((letter) => {
        this.props.fetchLetter(letter, preview)
      })
    }
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

  filter (filterValue, list) {
    const value = filterValue.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '')

    return list.filter((item) => {
      let inFilter = false
      if (item.searchBlob) {
        inFilter = inFilter || item.searchBlob.indexOf(value) >= 0
      }
      return inFilter
    }).slice(0, 50)
  }

  onFilterChange (event) {
    const filtered = this.filter(event.target.value, this.props.allDbs)
    let assistText = `${filtered.length} items beginning with the letter "${this.props.currentLetter.toUpperCase()}"`
    if (event.target.value) {
      assistText = `${filtered.length} results found for "${event.target.value}"`
    }

    this.setState({
      filterValue: event.target.value,
      filteredList: filtered,
      assistText: assistText,
    })

    setTimeout(() => {
      this.setState({
        assistText: '',
      })
    }, 1500)
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (this.props.currentLetter !== nextProps.currentLetter ||
    this.props.allLettersStatus !== nextProps.allLettersStatus) {
      // status of current or all letters has chnaged
      return true
    } else if (this.props.cfDatabaseLetter[this.props.currentLetter]) {
      // cfDatabaseLetter is defined
      if (this.props.cfDatabaseLetter[this.props.currentLetter].status !==
         nextProps.cfDatabaseLetter[nextProps.currentLetter].status) {
        // status changed
        return true
      } else if (this.state.filterValue !== nextState.filterValue) {
        // filter has changed
        return true
      }
    }
    return false
  }

  render () {
    let letter = this.props.currentLetter

    // ensure letter exists
    if (letter) {
      // dont allow going to /foo or /1 etc
      if (letter.length > 1 || ((letter < 'a' || letter > 'z') && letter !== '#')) {
        return <PageNotFound />
      }
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
      assistText={this.state.assistText}
    />
  }
}

DatabaseListContainer.propTypes = {
  fetchLetter: PropTypes.func.isRequired,
  currentLetter: PropTypes.string.isRequired,
  cfDatabaseLetter: PropTypes.object.isRequired,
  allLettersStatus: PropTypes.string.isRequired,
  allDbs: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
}

const DatabaseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(DatabaseListContainer)

export default withErrorBoundary(DatabaseList)
