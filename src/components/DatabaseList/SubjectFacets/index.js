import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter'

import * as helper from 'constants/HelperFunctions'

export class SubjectFacets extends Component {
  constructor (props) {
    super(props)

    this.onSubjectClick = this.onSubjectClick.bind(this)
    this.getFullSubjectFilters = this.getFullSubjectFilters.bind(this)
  }

  getFullSubjectFilters () {
    return this.props.activeSubjects.map(id => this.props.subjects.find(subject => subject.sys.id === id))
  }

  onSubjectClick (subject) {
    const newSubjects = JSON.parse(JSON.stringify(this.getFullSubjectFilters()))
    const existingIndex = newSubjects.findIndex(search => search.sys.id === subject.sys.id)
    if (existingIndex >= 0) {
      newSubjects.splice(existingIndex, 1)
    } else {
      newSubjects.push(subject)
    }

    this.props.onSubjectFilterApply(newSubjects)
  }

  render () {
    const displaySubjects = helper.sortList(this.props.subjects, 'linkText', 'asc').map(subject => ({
      ...subject,
      selected: this.props.activeSubjects.includes(subject.sys.id),
    }))
    return (
      <Presenter subjects={displaySubjects} onSubjectClick={this.onSubjectClick} />
    )
  }
}

SubjectFacets.propTypes = {
  subjects: PropTypes.array.isRequired,
  activeSubjects: PropTypes.array.isRequired,
  onSubjectFilterApply: PropTypes.func.isRequired,
}

export default SubjectFacets
