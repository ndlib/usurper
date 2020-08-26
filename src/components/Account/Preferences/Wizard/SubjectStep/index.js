import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'
import typy from 'typy'

import Footer from '../Footer'

import * as helper from 'constants/HelperFunctions'

class SubjectStep extends Component {
  constructor (props) {
    super(props)

    const selectedSubjects = props.data.filter((subject) => subject.selected)
    this.state = {
      selected: selectedSubjects,
      hoveredSubject: null,
      maxOrder: Math.max(0, ...selectedSubjects.map((item) => typy(item, 'order').safeNumber)),
    }
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.makeSubjectColumns = this.makeSubjectColumns.bind(this)
    this.onCheckboxChanged = this.onCheckboxChanged.bind(this)
    this.onSubjectEnter = this.onSubjectEnter.bind(this)
    this.onSubjectLeave = this.onSubjectLeave.bind(this)
    this.getTooltip = this.getTooltip.bind(this)
  }

  nextStep (event, skipSave) {
    this.props.nextStep(skipSave ? null : this.state.selected)
  }

  skipStep (event) {
    event.preventDefault()
    this.nextStep(event, true)
  }

  onCheckboxChanged (event) {
    if (typy(event, 'target').isFalsy) {
      return
    }

    const stateObj = {
      ...this.state,
      selected: JSON.parse(JSON.stringify(this.state.selected)),
    }
    if (event.target.checked) {
      const match = this.props.data.find((item) => item.sys.id === event.target.name)
      if (match) {
        // If order is falsy and NOT 0, add an order attribute that will append the item at the end of the list
        if (!match.order && match.order !== 0) {
          match.order = ++stateObj.maxOrder
        }
        stateObj.selected.push(match)
      }
    } else {
      stateObj.selected = stateObj.selected.filter((item) => item.sys.id !== event.target.name)
    }
    this.setState(stateObj)
  }

  onSubjectEnter (event) {
    this.setState({
      hoveredSubject: event.target,
    })
  }

  onSubjectLeave () {
    this.setState({
      hoveredSubject: null,
    })
  }

  getTooltip (dataTooltip) {
    // only display if hovering text is truncated
    if (!this.state.hoveredSubject ||
      !dataTooltip ||
      this.state.hoveredSubject.scrollWidth === this.state.hoveredSubject.clientWidth
    ) {
      return null
    }
    return this.state.hoveredSubject.textContent
  }

  makeSubjectColumns () {
    const columnCount = 4
    const output = []
    const maxPerColumn = Math.ceil(this.props.data.length / columnCount)
    for (let i = 0; i < columnCount; i++) {
      output.push(
        <div key={'column_' + i} className='column col-xs-12 col-sm-6 col-md-6 col-lg-3'>
          { helper.sortList(this.props.data, 'linkText', 'asc')
            .slice(maxPerColumn * i, maxPerColumn * (i + 1)).map((entry) => {
              const title = (entry.fields.usePageTitle && entry.fields.page)
                ? entry.fields.page.fields.title
                : entry.fields.title
              return (
                <label key={entry.sys.id} className='subject-checkbox-container'>
                  <input type='checkbox' name={entry.sys.id} onChange={this.onCheckboxChanged} defaultChecked={entry.selected} />
                  <span data-tip={title} onMouseEnter={this.onSubjectEnter} onMouseLeave={this.onSubjectLeave}>
                    {title}
                  </span>
                </label>
              )
            })
          }
        </div>
      )
    }
    return (<React.Fragment>{output}</React.Fragment>)
  }

  render () {
    return (
      <React.Fragment>
        <ReactTooltip getContent={this.getTooltip} />
        <div className='modal-body'>
          <span id='favoritesModalDesc'>Select the subjects that best describes your major or field(s) of study.</span>
          <div className='gap-top'>
            <div className='row subject-wizard-columns'>
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
