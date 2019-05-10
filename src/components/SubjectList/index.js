// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InternalLink from 'components/Contentful/InternalLink'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Loading from 'components/Messages/Loading'

import * as statuses from 'constants/APIStatuses'
import { fetchSubjects } from 'actions/contentful/subjects'

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
              return (
                <p key={entry.sys.id}>
                  <InternalLink cfEntry={entry} />
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
  const { cfSubjects } = state

  let subjects = []
  if (cfSubjects.status === statuses.SUCCESS) {
    // alphabetical sort
    subjects = Object.assign([], cfSubjects.data).sort((a, b) => {
      const left = a.linkText
      const right = b.linkText
      if (left < right) {
        return -1
      } else if (right < left) {
        return 1
      }
      return 0
    })
  }

  return {
    subjects: subjects,
    subjectsStatus: cfSubjects.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSubjects }, dispatch)
}

SubjectListContainer.propTypes = {
  subjects: PropTypes.array.isRequired,
  subjectsStatus: PropTypes.string.isRequired,
  fetchSubjects: PropTypes.func.isRequired,
  location: PropTypes.object,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubjectListContainer)
