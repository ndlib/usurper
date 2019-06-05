import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Footer from '../Footer'
import RadioList from 'components/Interactive/RadioList'

import { DEFAULT_LIBRARY } from 'actions/personal/settings'

class LibraryStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      library: props.defaultValue || DEFAULT_LIBRARY,
    }
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
    this.onRadioChanged = this.onRadioChanged.bind(this)
  }

  nextStep (event, skipSave) {
    this.props.nextStep(skipSave ? null : this.state.library)
  }

  skipStep (event) {
    event.preventDefault()
    this.nextStep(event, true)
  }

  onRadioChanged (value) {
    this.setState({
      library: value,
    })
  }

  render () {
    return (
      <React.Fragment>
        <div className='modal-body'>
          <h4 id='favoritesModalDesc'>Select your preferred location. These hours will display on the home screen.</h4>
          <RadioList
            radioName='default_library'
            entries={this.props.data.map((entry) => {
              return {
                title: entry.fields.alternateTitle || entry.fields.title,
                value: entry.fields.slug,
              }
            })}
            defaultValue={this.state.library}
            onChangeCallback={this.onRadioChanged}
          />
        </div>
        <Footer
          step={this.props.step} stepCount={this.props.stepCount} nextStep={this.nextStep}
          prevStep={this.props.prevStep} skipStep={this.skipStep} saving={this.props.saving}
        />
      </React.Fragment>
    )
  }
}

LibraryStep.propTypes = {
  data: PropTypes.array.isRequired,
  defaultValue: PropTypes.string,
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  saving: PropTypes.bool,
}

export default LibraryStep
