import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import InlineLoading from 'components/Messages/InlineLoading'
import SubjectStep from './SubjectStep'
import DatabaseStep from './DatabaseStep'
import LibraryStep from './LibraryStep'
import Presenter from './presenter'

import {
  convertContentfulToFavorites,
  getAllFavorites,
  setFavorites,
  KIND as FAVORITES_KIND,
} from 'actions/personal/favorites'
import { getHomeLibrary, setHomeLibrary, KIND as SETTINGS_KIND, DEFAULT_LIBRARY } from 'actions/personal/settings'
import { fetchBranches } from 'actions/contentful/branches'
import { fetchDefaultDbFavorites } from 'actions/contentful/database'
import { fetchSubjects } from 'actions/contentful/subjects'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

ReactModal.setAppElement('body')

const analytics = (event, step, data) => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: event,
    stepName: step,
    stepSaveData: data,
  })
}

const initialData = {
  [FAVORITES_KIND.subjects]: [],
  [FAVORITES_KIND.databases]: [],
  [SETTINGS_KIND.homeLibrary]: DEFAULT_LIBRARY,
}

class Wizard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      step: props.defaultStep,
      data: JSON.parse(JSON.stringify(initialData)),
    }

    this.dismiss = this.dismiss.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.prevStep = this.prevStep.bind(this)
    this.finishAndSave = this.finishAndSave.bind(this)
    this.body = this.body.bind(this)
    this.isLoading = this.isLoading.bind(this)

    if ([statuses.NOT_FETCHED, statuses.ERROR].includes(props.cfSubjects.status) || typy(props, 'cfSubjects.depth').safeNumber < 2) {
      props.fetchSubjects(props.preview, 3)
    }

    const fetchConditions = [
      { status: props.cfDatabases.defaults.status, action: () => props.fetchDefaultDbFavorites(props.preview) },
      { status: props.cfBranches.status, action: () => props.fetchBranches(props.preview, 0) },
      { status: props.homeLibrary.state, action: props.getHomeLibrary },
      { status: props.favoritesStatus, action: props.getAllFavorites },
    ]
    fetchConditions.forEach(condition => {
      if ([statuses.NOT_FETCHED, statuses.ERROR].includes(condition.status)) {
        condition.action()
      }
    })
  }

  componentDidUpdate (prevProps) {
    // If saving completed, close the modal
    if (this.props.updateStatus === statuses.SUCCESS && prevProps.updateStatus !== statuses.SUCCESS) {
      this.dismiss(true)
    }
  }

  dismiss (autoClosed) {
    // If save is already in progress don't do anything
    if (this.props.updateStatus === statuses.FETCHING) {
      return
    }

    if (!autoClosed) {
      analytics('closeWizard', this.props.stepList[this.state.step])
    }

    this.props.closeCallback()
  }

  prevStep () {
    const stepBeforeChange = this.props.stepList[this.state.step]
    analytics('prevStep', stepBeforeChange)

    const stateObj = { data: JSON.parse(JSON.stringify(this.state.data)) }
    if (this.state.step > 0) {
      stateObj.step = this.state.step - 1
      stateObj.data[stepBeforeChange] = JSON.parse(JSON.stringify(initialData[stepBeforeChange]))
    }
    this.setState(stateObj)
  }

  nextStep (saveData) {
    // If save is already in progress don't do anything
    if (this.props.updateStatus === statuses.FETCHING) {
      return
    }

    const stepBeforeChange = this.props.stepList[this.state.step]
    const stateObj = { data: JSON.parse(JSON.stringify(this.state.data)) }
    if (saveData) {
      stateObj.data[stepBeforeChange] = saveData

      // GA doesn't need the full contentful objects. Just get relevant data.
      const analyticsData = !Array.isArray(saveData) ? saveData : saveData.map((fave) => {
        if (fave.sys && fave.fields) {
          return typy(fave, 'sys.contentType.sys.id').safeString === 'internalLink' ? fave.linkText : fave.fields.title
        }
        // Doesn't seem to be a contentful item? Pass everything back.
        return fave
      })
      analytics('nextStep', stepBeforeChange, analyticsData)
    } else {
      stateObj.data[stepBeforeChange] = JSON.parse(JSON.stringify(initialData[stepBeforeChange]))
      analytics('skipStep', stepBeforeChange)
    }

    if (this.state.step < this.props.stepList.length - 1) {
      stateObj.step = this.state.step + 1
      this.setState(stateObj)
    } else {
      // Save everything since this was the final step.
      this.finishAndSave(stateObj)
    }
  }

  finishAndSave = (newState) => {
    this.setState(newState)
    // Since the real state won't update until the next digest, use the newState we just created
    // Only update steps that were included in this instance of the Wizard
    if (this.props.stepList.includes(FAVORITES_KIND.subjects)) {
      const subjects = convertContentfulToFavorites(newState.data[FAVORITES_KIND.subjects], FAVORITES_KIND.subjects)
      this.props.setFavorites(FAVORITES_KIND.subjects, subjects)
    }
    if (this.props.stepList.includes(FAVORITES_KIND.databases)) {
      this.props.setFavorites(FAVORITES_KIND.databases, newState.data[FAVORITES_KIND.databases])
    }
    if (this.props.stepList.includes(SETTINGS_KIND.homeLibrary)) {
      this.props.setHomeLibrary(newState.data[SETTINGS_KIND.homeLibrary])
    }
  }

  body () {
    const currentStepName = typy(this.props, `stepList[${this.state.step}]`).safeString

    const commonProps = {
      step: this.state.step,
      stepCount: this.props.stepList.length,
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      saving: this.props.updateStatus === statuses.FETCHING,
    }

    switch (currentStepName) {
      case FAVORITES_KIND.subjects:
        const subjectStepData = JSON.parse(JSON.stringify(this.props.cfSubjects.data)).map((subject) => {
          if (this.state.data[currentStepName].length) {
            subject.selected = this.state.data[currentStepName].some(x => (
              typy(x, 'sys.id').safeString === typy(subject, 'sys.id').safeString
            ))
          } else {
            const match = typy(this.props.favorites, `${currentStepName}.items`).safeArray.find(y => (
              y.key === typy(subject, 'sys.id').safeString
            ))
            if (match) {
              subject.selected = true
              subject.order = match.order
            }
          }
          return subject
        })
        return <SubjectStep data={subjectStepData} {...commonProps} />
      case FAVORITES_KIND.databases:
        let dbStepData = []
        const hasSubjects = this.state.data[FAVORITES_KIND.subjects].length > 0
        if (!this.state.data[currentStepName] || this.state.data[currentStepName].length === 0) {
          if (hasSubjects) {
            const relatedDbs = this.props.cfDatabases.data.filter((db) => (
              db.sys && this.state.data[FAVORITES_KIND.subjects].find((subject) => (
                typy(subject, 'fields.page.fields.relatedResources').safeArray.find((r) => r.sys.id === db.sys.id) ||
                typy(subject, 'fields.page.fields.relatedExtraSections').safeArray.find((section) => (
                  typy(section, 'fields.links').safeArray.find((r) => r.sys.id === db.sys.id)
                ))
              ))
            ))
            const existingFavorites = typy(this.props.favorites, `${FAVORITES_KIND.databases}.items`).safeArray
            // Convert the related dbs to match the favorites model, then remove any which are already favorites, and finally sort them
            const newDbs = helper.sortList(
              convertContentfulToFavorites(relatedDbs, FAVORITES_KIND.databases).filter(db => {
                return !existingFavorites.find(x => x.key === db.key)
              }),
              'title',
              'asc',
            )
            dbStepData = existingFavorites.concat(newDbs)
          } else {
            const defaultDbs = typy(this.props.cfDatabases, 'defaults.data').safeArray
            dbStepData = helper.sortList(
              convertContentfulToFavorites(defaultDbs, FAVORITES_KIND.databases), 'title', 'asc',
            )
          }
        } else {
          dbStepData = this.state.data[currentStepName]
        }
        return <DatabaseStep data={dbStepData} didSelectSubjects={hasSubjects} {...commonProps} />
      case SETTINGS_KIND.homeLibrary:
        return <LibraryStep data={this.props.cfBranches.data} defaultValue={this.props.homeLibrary.data} {...commonProps} />
      default:
        return null
    }
  }

  isLoading () {
    const currentStepName = this.props.stepList[this.state.step]
    return typy(this.props.favorites, `${currentStepName}.state`).safeString === statuses.FETCHING || (
      currentStepName === FAVORITES_KIND.subjects &&
      [statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.cfSubjects.status)
    ) || (
      currentStepName === FAVORITES_KIND.databases &&
      ([statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.cfDatabases.status) ||
      [statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.cfDatabases.defaults.status))
    ) || (
      currentStepName === SETTINGS_KIND.homeLibrary &&
      ([statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.cfBranches.status) ||
      [statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.homeLibrary.state))
    )
  }

  render () {
    return (
      <Presenter stepNumber={this.state.step + 1} stepCount={this.props.stepList.length} onDismiss={this.dismiss}>
        { this.isLoading() ? (
          <div className='modal-body'><InlineLoading /></div>
        ) : (
          this.body()
        )}
      </Presenter>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { favorites, settings, cfSubjects, cfBranches, cfDatabases } = state

  const homeLibrary = settings[SETTINGS_KIND.homeLibrary]
  const databases = []
  for (const subject of typy(cfSubjects, 'data').safeArray) {
    for (const resource of typy(subject, 'fields.page.fields.relatedResources').safeArray) {
      if (!databases.find((search) => search.sys.id === resource.sys.id)) {
        databases.push(resource)
      }
    }
    for (const section of typy(subject, 'fields.page.fields.relatedExtraSections').safeArray) {
      // Only get the items in the linkGroup that are a resource.
      for (const resource of typy(section, 'fields.links').safeArray.filter(link => {
        return typy(link, 'sys.contentType.sys.id').safeString === 'resource'
      })) {
        if (!databases.find((search) => search.sys.id === resource.sys.id)) {
          databases.push(resource)
        }
      }
    }
  }

  // Check status of each step included in this wizard so we know when saving is in progress and completed
  const updateStatuses = []
  ownProps.stepList = ownProps.stepList || Wizard.defaultProps.stepList
  if (ownProps.stepList.includes(FAVORITES_KIND.subjects)) {
    updateStatuses.push(favorites.update[FAVORITES_KIND.subjects].state)
  }
  if (ownProps.stepList.includes(FAVORITES_KIND.databases)) {
    updateStatuses.push(favorites.update[FAVORITES_KIND.databases].state)
  }
  if (ownProps.stepList.includes(SETTINGS_KIND.homeLibrary)) {
    updateStatuses.push(settings.update[SETTINGS_KIND.homeLibrary].state)
  }

  const favoritesStatuses = Object.values(FAVORITES_KIND).map((key) => favorites[key].state)

  return {
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
    cfSubjects: cfSubjects,
    cfBranches: cfBranches,
    cfDatabases: {
      status: cfSubjects.status,
      data: cfSubjects.data ? databases : null,
      defaults: cfDatabases.defaultFavorites,
    },
    homeLibrary: homeLibrary,
    updateStatus: helper.reduceStatuses(updateStatuses),
    favoritesStatus: helper.reduceStatuses(favoritesStatuses),
    favorites: favorites,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getHomeLibrary,
    fetchBranches,
    fetchDefaultDbFavorites,
    fetchSubjects,
    getAllFavorites,
    setFavorites,
    setHomeLibrary,
  }, dispatch)
}

Wizard.propTypes = {
  closeCallback: PropTypes.func,
  preview: PropTypes.bool,
  cfSubjects: PropTypes.object,
  cfBranches: PropTypes.object,
  cfDatabases: PropTypes.object,
  homeLibrary: PropTypes.object,
  updateStatus: PropTypes.string.isRequired,
  favoritesStatus: PropTypes.string.isRequired,
  favorites: PropTypes.object,
  getHomeLibrary: PropTypes.func.isRequired,
  fetchBranches: PropTypes.func.isRequired,
  fetchDefaultDbFavorites: PropTypes.func.isRequired,
  fetchSubjects: PropTypes.func.isRequired,
  getAllFavorites: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired,
  setHomeLibrary: PropTypes.func.isRequired,
  stepList: PropTypes.array, // Allows reordering or only using specific steps
  defaultStep: PropTypes.number,
}

Wizard.defaultProps = {
  stepList: [FAVORITES_KIND.subjects, FAVORITES_KIND.databases, SETTINGS_KIND.homeLibrary],
  defaultStep: 0,
}

export default connect(mapStateToProps, mapDispatchToProps)(Wizard)
