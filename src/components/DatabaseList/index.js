// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'
import { fetchSubjects } from 'actions/contentful/subjects'
import { fetchLetter } from 'actions/contentful/database'
import { fetchSidebar } from 'actions/contentful/staticContent'
import { fetchGrouping } from 'actions/contentful/grouping'
import { mapFacet } from 'constants/facets'
import ListPresenter from './presenter.js'
import { multidisciplinarySubject } from 'constants/staticData'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

import getToken from 'actions/personal/token'
import { getFavorites, KIND as FAVORITES_KIND } from 'actions/personal/favorites'

const PAGE_SLUG = 'databases'
const FACETS_GROUPING = 'resource-facets'
const alphabet = 'abcdefghijklmnopqrstuvwxyz#'.split('')

// Concat all database letters into one big list for searching
const concatDbs = (raw) => {
  let out = []
  alphabet.forEach((letter) => {
    if (raw[letter] && raw[letter].data) {
      out = out.concat(raw[letter].data)
    }
  })
  return out
}

// sort all letters by title alphabetically
const sortDbs = (raw) => {
  const out = {}
  if (raw) {
    alphabet.forEach((letter) => {
      out[letter] = {
        ...raw[letter],
        data: helper.sortList(typy(raw[letter], 'data').safeArray, 'fields.title', 'asc'),
      }
    })
  }
  return out
}

export class DatabaseListContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filterValue: '',
      filteredList: props.allDbs,
      assistText: 'All Databases',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onSubjectFilterApply = this.onSubjectFilterApply.bind(this)
    this.onLetterFilterApply = this.onLetterFilterApply.bind(this)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.removeSubjectFromFilter = this.removeSubjectFromFilter.bind(this)
    this.removeLetterFilter = this.removeLetterFilter.bind(this)
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    // Fetch Dynamic Page from Contentful to supplement page contents
    if (this.props.cfStatic.status === statuses.NOT_FETCHED || this.props.cfStatic.slug !== PAGE_SLUG) {
      this.props.fetchSidebar(PAGE_SLUG, preview)
    }

    if (!this.props.login || this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    }
    if (this.props.login && this.props.login.token && this.props.favoritesStatus === statuses.NOT_FETCHED) {
      this.props.getFavorites(FAVORITES_KIND.databases)
    }
    if (this.props.cfSubjects.status === statuses.NOT_FETCHED) {
      this.props.fetchSubjects(preview)
    }
    if (this.props.facetStatus === statuses.NOT_FETCHED) {
      this.props.fetchGrouping(FACETS_GROUPING, preview, 3)
    }
    // Subjects are needed before fetching databases because the databases depend on it
    if (this.props.cfSubjects.status === statuses.SUCCESS) {
      alphabet.forEach(letter => {
        const letterStatus = typy(this.props.cfDatabases, `${letter}.status`).safeString || statuses.NOT_FETCHED
        if (letterStatus === statuses.NOT_FETCHED) {
          this.props.fetchLetter(letter, preview)
        }
      })
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate (prevProps, prevState) {
    this.checkFullyLoaded()

    if (this.state.filterValue !== prevState.filterValue || this.props.allDbs.length !== prevProps.allDbs.length ||
      this.props.filterLetter !== prevProps.filterLetter) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        filteredList: this.filter(this.state.filterValue, this.props.allDbs),
      })
    }
  }

  filter (filterValue, list) {
    const value = filterValue.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`'~()]/g, '')
    const searchFiltered = helper.filterList(list, 'searchBlob', value, false)
    return (!this.props.filterLetter) ? searchFiltered : searchFiltered.filter(item => {
      return item.fields.title.toLowerCase().startsWith(this.props.filterLetter) ||
        item.fields.databaseLetter === this.props.filterLetter
    })
  }

  onFilterChange (event) {
    const filtered = this.filter(event.target.value, this.props.allDbs)
    const assistText = event.target.value
      ? `${filtered.length} results found for "${event.target.value}"`
      : `All databases${(this.props.filterLetter || this.props.activeSubjects.length) ? ' in filter' : ''}`

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

  onSubjectFilterApply (filterName, selection) {
    const queryString = helper.buildQueryString(this.props.location.search, filterName, selection)
    this.props.history.push(this.props.location.pathname + queryString)
  }

  onLetterFilterApply (letter) {
    const queryString = helper.buildQueryString(this.props.location.search, 'letter', letter)
    this.props.history.push(this.props.location.pathname + queryString)
  }

  removeSubjectFromFilter (subjectId) {
    const newSubjectIds = this.props.activeSubjects.filter(activeSubject => activeSubject !== subjectId)
    this.onSubjectFilterApply('subject', newSubjectIds)
  }

  removeLetterFilter () {
    this.onLetterFilterApply(null)
  }

  render () {
    return <ListPresenter
      list={this.state.filteredList}
      status={helper.reduceStatuses([this.props.allLettersStatus, this.props.cfStatic.status])}
      filterValue={this.state.filterValue}
      filterLetter={this.props.filterLetter}
      onFilterChange={this.onFilterChange}
      assistText={this.state.assistText}
      subjects={typy(this.props.cfSubjects, 'data').safeArray}
      activeSubjects={this.props.activeSubjects}
      onSubjectFilterApply={this.onSubjectFilterApply}
      onLetterFilterApply={this.onLetterFilterApply}
      removeSubjectFromFilter={this.removeSubjectFromFilter}
      removeLetterFilter={this.removeLetterFilter}
      history={this.props.history}
      slug={PAGE_SLUG}
      contentfulPage={typy(this.props.cfStatic.json).safeObject}
      facets={this.props.facets}
    />
  }
}

export const mapStateToProps = (state, thisProps) => {
  const { personal, favorites, cfSubjects, cfStatic, grouping } = state

  // get a status for all letters, either error, fetching or success (not found || success = success)
  const letterStatuses = alphabet.map((letter) => typy(state.cfDatabases[letter], 'status').safeString || statuses.NOT_FETCHED)
  const facetStatus = typy(grouping, `${FACETS_GROUPING}.status`).safeString || statuses.NOT_FETCHED
  const allLettersStatus = helper.reduceStatuses([
    ...letterStatuses,
    cfSubjects.status,
    facetStatus,
  ])
  const queryParams = decodeURIComponent(thisProps.location.search.replace('?', '')).split('&')
  const activeSubjects = []
  let letter = ''
  queryParams.forEach(param => {
    const split = param.split('=')
    if (split[0].toLowerCase() === 'subject') {
      activeSubjects.push(split[1])
    } else if (split[0].toLowerCase() === 'letter') {
      letter = alphabet.includes(split[1].toLowerCase()) ? split[1].toLowerCase() : ''
    }
  })

  // Add "Multidisciplinary" which mimics a normal subject on this page, but doesn't exist in Contentful because it isn't really
  const subjectsList = cfSubjects.data
    ? [
      ...cfSubjects.data,
      multidisciplinarySubject,
    ]
    : []

  const facets = (facetStatus === statuses.SUCCESS)
    ? typy(grouping, `${FACETS_GROUPING}.data.fields.items`).safeArray.map(mapFacet)
    : []

  return {
    cfDatabases: sortDbs(state.cfDatabases),
    cfSubjects: {
      ...cfSubjects,
      data: subjectsList,
    },
    cfStatic,
    allLettersStatus: allLettersStatus,
    allDbs: allLettersStatus === statuses.SUCCESS ? concatDbs(state.cfDatabases) : [],
    filterLetter: letter,
    login: personal.login,
    favoritesStatus: favorites[FAVORITES_KIND.databases].state,
    activeSubjects: activeSubjects,
    facetStatus,
    facets,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSubjects, fetchLetter, getToken, getFavorites, fetchSidebar, fetchGrouping }, dispatch)
}

DatabaseListContainer.propTypes = {
  fetchSubjects: PropTypes.func.isRequired,
  fetchLetter: PropTypes.func.isRequired,
  filterLetter: PropTypes.string,
  cfDatabases: PropTypes.object.isRequired, // eslint-disable-line react/no-unused-prop-types
  cfSubjects: PropTypes.object.isRequired,
  cfStatic: PropTypes.shape({
    status: PropTypes.string.isRequired,
    slug: PropTypes.string,
    json: PropTypes.object,
  }).isRequired,
  allLettersStatus: PropTypes.string.isRequired,
  getToken: PropTypes.func,
  getFavorites: PropTypes.func,
  fetchSidebar: PropTypes.func,
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
  }),
  favoritesStatus: PropTypes.string,
  activeSubjects: PropTypes.arrayOf(PropTypes.string),
  allDbs: PropTypes.array.isRequired,
  fetchGrouping: PropTypes.func.isRequired,
  facetStatus: PropTypes.string.isRequired,
  facets: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    pathname: PropTypes.string,
  }),
  history: PropTypes.object,
}

const DatabaseList = connect(mapStateToProps, mapDispatchToProps)(DatabaseListContainer)
export default DatabaseList
