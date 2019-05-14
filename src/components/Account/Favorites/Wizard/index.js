import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InlineLoading from 'components/Messages/InlineLoading'
import SubjectStep from './SubjectStep'
import DatabaseStep from './DatabaseStep'
import LibraryStep from './LibraryStep'

import {
  convertContentfulToFavorites,
  setFavorites,
  KIND as FAVORITES_KIND,
} from 'actions/personal/favorites'
import {
  getHomeLibrary,
  setHomeLibrary,
  KIND as SETTINGS_KIND,
  DEFAULT_LIBRARY,
} from 'actions/personal/settings'
import { fetchBranches } from 'actions/contentful/branches'
import { fetchSubjects } from 'actions/contentful/subjects'

import * as states from 'constants/APIStatuses'

ReactModal.setAppElement('body')

const STEPS_ORDER = [FAVORITES_KIND.subjects, FAVORITES_KIND.databases, SETTINGS_KIND.homeLibrary]

const analytics = (event, step, data) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: event,
    stepName: step,
    stepSaveData: data,
  })
}

class Wizard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      step: props.defaultStep,
      data: {
        [FAVORITES_KIND.subjects]: [],
        [FAVORITES_KIND.databases]: [],
        [SETTINGS_KIND.homeLibrary]: DEFAULT_LIBRARY,
      },
    }

    this.dismiss = this.dismiss.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.body = this.body.bind(this)

    if ([states.NOT_FETCHED, states.ERROR].includes(props.cfSubjects.status) || !props.cfSubjects.depth >= 1) {
      props.fetchSubjects(props.preview, 1)
    }
    if ([states.NOT_FETCHED, states.ERROR].includes(props.cfBranches.status)) {
      props.fetchBranches(props.preview, 0)
    }
    if ([states.NOT_FETCHED, states.ERROR].includes(props.homeLibrary.state)) {
      props.getHomeLibrary()
    }
  }

  componentDidUpdate (prevProps) {
    // If saving completed, close the modal
    if (this.props.updateStatus === states.SUCCESS && prevProps.updateStatus !== states.SUCCESS) {
      this.dismiss(true)
    }
  }

  dismiss (autoClosed) {
    // If save is already in progress don't do anything
    if (this.props.updateStatus === states.FETCHING) {
      return
    }

    if (!autoClosed) {
      analytics('closeWizard', STEPS_ORDER[this.state.step])
    }

    this.props.closeCallback()
  }

  prevStep () {
    const stepBeforeChange = STEPS_ORDER[this.state.step]
    analytics('prevStep', stepBeforeChange)

    const stateObj = { data: JSON.parse(JSON.stringify(this.state.data)) }
    if (this.state.step > 0) {
      stateObj.step = this.state.step - 1
      stateObj.data[stepBeforeChange] = stepBeforeChange === SETTINGS_KIND.homeLibrary ? DEFAULT_LIBRARY : []
    }
    this.setState(stateObj)
  }

  nextStep (saveData) {
    // If save is already in progress don't do anything
    if (this.props.updateStatus === states.FETCHING) {
      return
    }

    const stepBeforeChange = STEPS_ORDER[this.state.step]
    const stateObj = { data: JSON.parse(JSON.stringify(this.state.data)) }
    if (saveData) {
      stateObj.data[stepBeforeChange] = saveData

      // GA doesn't need the full contentful objects. Just get relevant data.
      const analyticsData = !Array.isArray(saveData) ? saveData : saveData.map((fave) => {
        if (fave.sys && fave.fields) {
          if (fave.sys.contentType.sys.id === 'page' && fave.fields.type === 'Subject') {
            return fave.fields.alternateTitle || fave.fields.title
          }
        }
        // Doesn't seem to be a contentful item? Pass everything back.
        return fave
      })
      analytics('nextStep', stepBeforeChange, analyticsData)
    } else {
      stateObj.data[stepBeforeChange] = stepBeforeChange === SETTINGS_KIND.homeLibrary ? DEFAULT_LIBRARY : []
      analytics('skipStep', stepBeforeChange)
    }

    if (this.state.step < STEPS_ORDER.length - 1) {
      stateObj.step = this.state.step + 1
      this.setState(stateObj)
    } else {
      // Save everything since this was the final step.
      this.setState(stateObj)
      // Since the real state won't update until the next digest, use the stateObj we just created
      const subjects = convertContentfulToFavorites(stateObj.data[FAVORITES_KIND.subjects], FAVORITES_KIND.subjects)
      this.props.setFavorites(FAVORITES_KIND.subjects, subjects)
      this.props.setFavorites(FAVORITES_KIND.databases, stateObj.data[FAVORITES_KIND.databases])
      this.props.setHomeLibrary(stateObj.data[SETTINGS_KIND.homeLibrary])
    }
  }

  body () {
    const currentStepName = STEPS_ORDER[this.state.step]
    const isLoading = (
      currentStepName === FAVORITES_KIND.subjects &&
      [states.NOT_FETCHED, states.FETCHING].includes(this.props.cfSubjects.status)
    ) || (
      currentStepName === FAVORITES_KIND.databases &&
      [states.NOT_FETCHED, states.FETCHING].includes(this.props.cfDatabases.status)
    ) || (
      currentStepName === SETTINGS_KIND.homeLibrary &&
      ([states.NOT_FETCHED, states.FETCHING].includes(this.props.cfBranches.status) ||
      [states.NOT_FETCHED, states.FETCHING].includes(this.props.homeLibrary.state))
    )

    if (isLoading) {
      return <div className='modal-body'><InlineLoading /></div>
    }

    const commonProps = {
      step: this.state.step,
      stepCount: STEPS_ORDER.length,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      saving: this.props.updateStatus === states.FETCHING,
    }

    switch (currentStepName) {
      case FAVORITES_KIND.subjects:
        const subjectStepData = (!this.state.data[currentStepName] || this.state.data[currentStepName].length === 0)
          ? this.props.cfSubjects.data
          : JSON.parse(JSON.stringify(this.props.cfSubjects.data)).map((subject) => {
            subject.selected = this.state.data[currentStepName].some(x => x.fields.slug === subject.fields.slug)
            return subject
          })
        return <SubjectStep data={subjectStepData} {...commonProps} />
      case FAVORITES_KIND.databases:
        let dbStepData = []
        if (!this.state.data[currentStepName] || this.state.data[currentStepName].length === 0) {
          const relatedDbs = this.props.cfDatabases.data.filter((db) => {
            return db.fields && this.state.data[FAVORITES_KIND.subjects].find((subject) => {
              return subject.fields && subject.fields.relatedResources && subject.fields.relatedResources.find((r) => {
                return r.sys.id === db.sys.id
              })
            })
          })
          dbStepData = convertContentfulToFavorites(relatedDbs, FAVORITES_KIND.databases)
            .sort((a, b) => a.title < b.title ? -1 : (a.title > b.title ? 1 : 0))
            .slice(0, 8)
        } else {
          dbStepData = this.state.data[currentStepName]
        }
        return <DatabaseStep data={dbStepData} {...commonProps} />
      case SETTINGS_KIND.homeLibrary:
        return <LibraryStep
          data={this.props.cfBranches.data}
          defaultValue={this.props.homeLibrary.data}
          {...commonProps} />
      default:
        return null
    }
  }

  render () {
    return (
      <ReactModal
        isOpen
        shouldCloseOnEsc
        onRequestClose={this.dismiss}
        contentLabel='Favorites Setup'
        className='modal'
        overlayClassName='modal-overlay'
        ariaHideApp
        aria={{
          labelledby: 'favoritesModalTitle',
          describedby: 'favoritesModalDesc',
        }}
        shouldFocusAfterRender
        shouldReturnFocusAfterClose
      >
        <section className='group'>
          <h3 id='favoritesModalTitle'>
            <span>Favorites Setup</span>
            <div className='wizard-step-count-top'>{this.state.step + 1}/{STEPS_ORDER.length}</div>
            <div className='close-button' title='Close' aria-label='Close' onClick={this.dismiss} />
          </h3>
          {this.body()}
        </section>
      </ReactModal>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { favorites, settings, cfSubjects, cfBranches } = state

  const homeLibrary = settings[SETTINGS_KIND.homeLibrary]
  const databases = []
  for (const subject of (cfSubjects.data || [])) {
    for (const resource of (subject.fields.relatedResources || [])) {
      if (!databases.find((search) => search.sys.id === resource.sys.id)) {
        databases.push(resource)
      }
    }
  }

  // Check status so we know when saving is in progress and completed
  const updateStatus = [
    favorites.update[FAVORITES_KIND.subjects].state,
    favorites.update[FAVORITES_KIND.databases].state,
    settings.update[SETTINGS_KIND.homeLibrary].state,
  ].reduce((a, b) => {
    const success = (status) => status === states.SUCCESS
    const error = (status) => status === states.ERROR
    const updating = (status) => status === states.FETCHING

    if (error(a) || error(b)) {
      return states.ERROR
    } else if (updating(a) || updating(b)) {
      return states.FETCHING
    } else if (success(a) && success(b)) {
      return states.SUCCESS
    }
    return states.NOT_FETCHED
  })

  return {
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
    cfSubjects: cfSubjects,
    cfBranches: cfBranches,
    cfDatabases: {
      status: cfSubjects.status,
      data: cfSubjects.data ? databases : null,
    },
    homeLibrary: homeLibrary,
    updateStatus: updateStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getHomeLibrary, fetchBranches, fetchSubjects, setFavorites, setHomeLibrary }, dispatch)
}

Wizard.propTypes = {
  closeCallback: PropTypes.func,
  preview: PropTypes.bool,
  cfSubjects: PropTypes.object,
  cfBranches: PropTypes.object,
  cfDatabases: PropTypes.object,
  homeLibrary: PropTypes.object,
  updateStatus: PropTypes.string.isRequired,
  getHomeLibrary: PropTypes.func.isRequired,
  fetchBranches: PropTypes.func.isRequired,
  fetchSubjects: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
  setHomeLibrary: PropTypes.func.isRequired,
  defaultStep: PropTypes.number,
}

Wizard.defaultProps = {
  defaultStep: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
