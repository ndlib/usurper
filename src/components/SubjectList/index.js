// Container component for a Page content type from Contentful
import typy from 'typy'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InternalLink from 'components/Contentful/InternalLink'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Loading from 'components/Messages/Loading'
import FavoriteIcon from 'components/Account/Preferences/FavoriteIcon'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import { fetchGrouping } from 'actions/contentful/grouping'
import { getFavorites, KIND } from 'actions/personal/favorites'

export const GROUPING_ID = 'subjects-a-z-list'

export class SubjectListContainer extends Component {
  constructor (props) {
    super(props)

    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.makeColumns = this.makeColumns.bind(this)
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.subjectsStatus === statuses.NOT_FETCHED) {
      this.props.fetchGrouping(GROUPING_ID, preview, 2)
    }
    if (this.props.loggedIn && this.props.favoritesStatus === statuses.NOT_FETCHED) {
      this.props.getFavorites(KIND.subjects)
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  makeColumns (columnCount) {
    const output = []
    const maxPerColumn = Math.ceil(this.props.subjects.length / columnCount)
    for (let i = 0; i < columnCount; i++) {
      output.push(
        <div key={'column_' + i} className={'column col-xs-12 col-sm-' + Math.floor(12 / columnCount)}>
          {
            this.props.subjects.slice(maxPerColumn * i, maxPerColumn * (i + 1)).map((entry) => {
              const isFavorited = !!(this.props.favorites.find((fav) => {
                return entry.itemKey === fav.itemKey
              }))
              return (
                <p key={entry.itemKey}>
                  <FavoriteIcon kind={KIND.subjects} data={[ entry ]} isFavorited={isFavorited} />
                  <InternalLink cfEntry={entry.cfEntry} />
                </p>
              )
            }, this)
          }
        </div>
      )
    }
    return (<React.Fragment>{output}</React.Fragment>)
  }

  render () {
    if (this.props.subjectsStatus === statuses.FETCHING) {
      return (<Loading />)
    }

    return (
      <div className='container-fluid content-area'>
        <SearchProgramaticSet open={false} />
        <PageTitle
          title='Subjects'
          subtitle='Resources, guides, and services selected by librarians for each of the following subject areas.'
        />
        <div className='row'>
          {this.makeColumns(2)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { personal, favorites, grouping } = state

  const subjectsStatus = typy(grouping, `${GROUPING_ID}.status`).safeString || statuses.NOT_FETCHED
  let subjects = []
  if (subjectsStatus === statuses.SUCCESS) {
    const contentfulSubjects = typy(grouping, `${GROUPING_ID}.data.fields.items`).safeArray
      .map((entry) => ({
        title: (entry.fields.usePageTitle && entry.fields.page)
          ? typy(entry, 'fields.page.fields.title').safeString
          : entry.fields.title,
        itemKey: entry.sys.id,
        url: '/' + typy(entry, 'fields.page.fields.slug').safeString,
        cfEntry: entry,
      }))

    subjects = helper.sortList(Object.assign([], contentfulSubjects), 'title', 'asc')
  }

  const favoritesStatus = favorites[KIND.subjects].state
  const subjectFavorites = favoritesStatus === statuses.SUCCESS ? favorites[KIND.subjects].items : []

  return {
    subjects,
    subjectsStatus,
    favorites: subjectFavorites,
    favoritesStatus: favoritesStatus,
    loggedIn: !!(personal.login && personal.login.token),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGrouping, getFavorites }, dispatch)
}

SubjectListContainer.propTypes = {
  subjects: PropTypes.array.isRequired,
  subjectsStatus: PropTypes.string.isRequired,
  fetchGrouping: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  location: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  favoritesStatus: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListContainer)
