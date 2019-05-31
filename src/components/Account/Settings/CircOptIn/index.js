import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KIND, getCircStatus, setCircStatus } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'

import PolicyInfo from './PolicyInfo'
import CircHistoryModal from './CircHistoryModal'

export class CircOptInContainer extends Component {
  constructor (props) {
    super(props)
    this.confirmToggleStatus = this.confirmToggleStatus.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.statusText = this.statusText.bind(this)
    this.state = {
      updated: false,
      modalOpen: false,
    }
  }

  dismiss () {
    if (!this.props.updating) {
      this.setState({ modalOpen: false })
    }
  }

  componentDidUpdate (prevProps) {
    // If opting in/out completed, dismiss the confirmation modal
    if (prevProps.updating && !this.props.updating) {
      this.dismiss()
    }
  }

  componentDidMount () {
    if (this.props.circStatus === statuses.NOT_FETCHED) {
      this.props.getCircStatus()
    }
  }

  openModal = () => {
    this.setState({ updated: false, modalOpen: true })
  }

  confirmToggleStatus () {
    const newValue = !this.props.optedIn
    this.props.setCircStatus(newValue)
    this.setState({
      updated: true,
    })
  }

  statusText () {
    switch (this.props.updateStatus) {
      case statuses.SUCCESS:
        return this.props.optedIn ? 'Successfully opted in.' : 'Successfully opted out.'
      case statuses.ERROR:
        return 'Failed to update preference. Please refresh and try again.'
      default:
        return null
    }
  }

  render () {
    if ([statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.circStatus)) {
      return <InlineLoading />
    }

    const buttonText = this.props.optedIn ? 'Opt-out and delete history' : 'Opt-in to save history'
    const checkboxLabel = this.props.optedIn ? 'You have opted to save your checkout history.' : 'Your checkout history is not being saved.'
    return (
      <React.Fragment>
        <section className='group opt-in'>
          <h3>Checkout History</h3>
          <div className='section-box'>
            <input id='circ-opt-in' type='checkbox' checked={this.props.optedIn} disabled />
            <label htmlFor='circ-opt-in'>{checkboxLabel}</label>
            <button className='right' onClick={this.openModal}>{buttonText}</button>
            <UpdateStatus className='pad-edges-md' status={this.props.updateStatus} text={this.statusText()} />
          </div>
          <hr />
          <PolicyInfo />
        </section>
        <CircHistoryModal
          isOpen={this.state.modalOpen} optedIn={this.props.optedIn} updating={this.props.updating}
          onClose={this.dismiss} onConfirm={this.confirmToggleStatus} />
      </React.Fragment>
    )
  }
}

export const mapStateToProps = (state) => {
  const { settings } = state
  const circStatus = settings[KIND.circStatus].state
  const optedIn = circStatus === statuses.SUCCESS ? settings[KIND.circStatus].data : false
  const updateStatus = settings['update'][KIND.circStatus].state

  return {
    circStatus: circStatus,
    optedIn: optedIn,
    updateStatus: updateStatus,
    updating: updateStatus === statuses.FETCHING,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCircStatus,
    setCircStatus,
  }, dispatch)
}

CircOptInContainer.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
  circStatus: PropTypes.string.isRequired,
  optedIn: PropTypes.bool,
  updateStatus: PropTypes.string.isRequired,
  updating: PropTypes.bool,
}
export default connect(mapStateToProps, mapDispatchToProps)(CircOptInContainer)
