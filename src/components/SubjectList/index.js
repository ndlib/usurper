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
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import { fetchSubjects } from 'actions/contentful/subjects'
import { getFavorites, KIND } from 'actions/personal/favorites'

export class SubjectListContainer extends Component {
  constructor (props) {
    super(props)

    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.makeColumns = this.makeColumns.bind(this)
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.subjectsStatus === statuses.NOT_FETCHED) {
      this.props.fetchSubjects(preview)
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
                return entry.key === fav.key
              }))
              return (
                <p key={entry.key}>
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
  const { cfSubjects, personal, favorites } = state

  let subjects = []
  if (cfSubjects.status === statuses.SUCCESS) {
    const contentfulSubjects = typy(cfSubjects, 'data.length').isTruthy
      ? cfSubjects.data
        .filter((entry) => entry.fields.includeOnSubjectList)
        .map((entry) => ({
          title: entry.linkText,
          key: entry.fields.id,
          url: '/' + typy(entry, 'fields.page.fields.slug').safeString,
          cfEntry: entry,
        }))
      : []

    subjects = helper.sortList(Object.assign([], contentfulSubjects), 'title', 'asc')
  }

  const favoritesStatus = favorites[KIND.subjects].state
  const subjectFavorites = favoritesStatus === statuses.SUCCESS ? favorites[KIND.subjects].items : []

  return {
    subjects: subjects,
    subjectsStatus: cfSubjects.status,
    favorites: subjectFavorites,
    favoritesStatus: favoritesStatus,
    loggedIn: !!(personal.login && personal.login.token),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSubjects, getFavorites }, dispatch)
}

SubjectListContainer.propTypes = {
  subjects: PropTypes.array.isRequired,
  subjectsStatus: PropTypes.string.isRequired,
  fetchSubjects: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  location: PropTypes.object,
  favorites: PropTypes.array.isRequired,
  favoritesStatus: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListContainer)
