import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'

class SubjectStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: props.data.filter((subject) => subject.selected),
    }
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.makeSubjectColumns = this.makeSubjectColumns.bind(this)
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this)
  }

  nextStep (event, skipSave) {
    this.props.nextStep(skipSave ? null : this.state.selected)
  }

  skipStep (event) {
    event.preventDefault()
    this.nextStep(event, true)
  }

  onCheckboxChanged (event) {
    if (!event.target) {
      return
    }

    const stateObj = JSON.parse(JSON.stringify(this.state))
    if (event.target.checked) {
      const match = this.props.data.find((item) => item.fields.slug === event.target.name)
      if (match) {
        stateObj.selected.push(match)
      }
    } else {
      stateObj.selected = stateObj.selected.filter((item) => item.fields.slug !== event.target.name)
    }
    this.setState(stateObj)
  }

  makeSubjectColumns () {
    const columnCount = 4
    const output = []
    const maxPerColumn = Math.ceil(this.props.data.length / columnCount)
    for (let i = 0; i < columnCount; i++) {
      output.push(
        <div key={'column_' + i} className='column col-xs-12 col-sm-6 col-md-6 col-lg-3'>
          {this.props.data.slice(maxPerColumn * i, maxPerColumn * (i + 1)).map((entry) => (
            <label key={entry.sys.id} className='subject-checkbox-container'>
              <input
                type='checkbox'
                name={entry.fields.slug}
                onChange={this.onCheckboxChanged}
                defaultChecked={entry.selected}
              />
              <span>{entry.fields.alternateTitle || entry.fields.title}</span>
            </label>
          ))}
        </div>
      )
    }
    return (<React.Fragment>{output}</React.Fragment>)
  }

  render () {
    return (
      <React.Fragment>
        <div className='modal-body'>
          <h4 id='favoritesModalDesc'>Select the subjects that best describes your major or field(s) of study.</h4>
          <div className='gap-top'>
            <div className='row'>
              {this.makeSubjectColumns()}
            </div>
          </div>
        </div>
        <Footer
          step={this.props.step}
          stepCount={this.props.stepCount}
          nextStep={this.nextStep}
          prevStep={this.props.prevStep}
          skipStep={this.skipStep}
          saving={this.props.saving}
        />
      </React.Fragment>
    )
  }
}

SubjectStep.propTypes = {
  data: PropTypes.array,
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  saving: PropTypes.bool,
}

export default SubjectStep
