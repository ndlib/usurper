import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Presenter from './presenter'

import * as helper from 'constants/HelperFunctions'

export class SubjectFacets extends Component {
  constructor (props) {
    super(props)

    this.showMore = this.showMore.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.onSubjectClick = this.onSubjectClick.bind(this)
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this)
    this.getFullSubjectFilters = this.getFullSubjectFilters.bind(this)

    this.state = {
      resultsToShow: 5,
      selectedSubjects: this.getFullSubjectFilters(),
    }
  }

  componentDidUpdate (prevProps) {
    // If the applied filters changes, update the state to match
    if (JSON.stringify(this.props.activeSubjects) !== JSON.stringify(prevProps.activeSubjects)) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        selectedSubjects: this.getFullSubjectFilters(),
      })
    }
  }

  getFullSubjectFilters () {
    return this.props.activeSubjects.map(id => this.props.subjects.find(subject => subject.sys.id === id))
  }

  showMore () {
    this.setState({
      resultsToShow: this.state.resultsToShow + 10,
    })
  }

  applyFilter (overrideSubjects) {
    const selection = Array.isArray(overrideSubjects) ? overrideSubjects : this.state.selectedSubjects
    this.props.onSubjectFilterApply(selection)
  }

  onSubjectClick (subject) {
    const newSubjects = JSON.parse(JSON.stringify(this.getFullSubjectFilters()))
    const existingIndex = newSubjects.findIndex(search => search.sys.id === subject.sys.id)
    if (existingIndex >= 0) {
      newSubjects.splice(existingIndex, 1)
    } else {
      newSubjects.push(subject)
    }

    this.setState({
      selectedSubjects: newSubjects,
    })

    // We need to override subjects by passing them because the state will not update until the next cycle
    this.applyFilter(newSubjects)
  }

  onCheckboxChanged (event, subject) {
    const newSubjects = JSON.parse(JSON.stringify(this.state.selectedSubjects))

    if (event.target.checked) {
      newSubjects.push(subject)
    } else {
      const position = newSubjects.findIndex(search => search.sys.id === subject.sys.id)
      if (position >= 0) {
        newSubjects.splice(position, 1)
      }
    }

    this.setState({
      selectedSubjects: newSubjects,
    })
  }

  render () {
    return (
      <Presenter
        subjects={helper.sortList(this.props.subjects, 'linkText', 'asc')}
        selectedSubjects={this.state.selectedSubjects}
        activeSubjects={this.props.activeSubjects}
        resultsToShow={this.state.resultsToShow}
        showMore={this.showMore}
        applyFilter={this.applyFilter}
        onSubjectClick={this.onSubjectClick}
        onCheckboxChanged={this.onCheckboxChanged}
      />
    )
  }
}

SubjectFacets.propTypes = {
  subjects: PropTypes.array.isRequired,
  activeSubjects: PropTypes.array.isRequired,
  onSubjectFilterApply: PropTypes.func.isRequired,
}

export default SubjectFacets
