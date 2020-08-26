import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UpdateStatus from 'components/Messages/UpdateStatus'
import InlineLoading from 'components/Messages/InlineLoading'

import { clearUpdateSettings, setChatOptOut, KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

export class ChatContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: props.defaultChecked,
    }

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.statusText = this.statusText.bind(this)
  }

  onChange = (event) => {
    this.setState({
      selectedValue: event.target.checked,
    })
    if ([statuses.SUCCESS, statuses.ERROR].includes(this.props.updateStatus)) {
      this.props.clearUpdateSettings(KIND.chatOptOut)
    }
  }

  onSave = (event) => {
    event.preventDefault()
    if (this.props.updateStatus === statuses.FETCHING) {
      return null
    }

    this.props.setChatOptOut(this.state.selectedValue)
  }

  statusText () {
    switch (this.props.updateStatus) {
      case statuses.SUCCESS:
        return 'Chat preferences saved.'
      case statuses.ERROR:
        return 'Chat Preferences failed to update.'
      default:
        return null
    }
  }

  render () {
    const saving = this.props.updateStatus === statuses.FETCHING

    return (
      <section className='group chat-preferences' id='chatPreferences'>
        <h3>Chat</h3>
        <div className='section-box pad-edges-sm'>
          <form onSubmit={this.onSave}>
            <label>
              <input
                type='checkbox'
                name='chatInviteCheckbox'
                onChange={this.onChange}
                defaultChecked={this.props.defaultChecked}
              />
              Disable invitations to chat when logged in.
            </label>
            <div>
              <button type='submit' className='right' aria-label='Save' disabled={saving}>Save</button>
              { saving ? (
                <InlineLoading title='Saving' className='fright pad-edges-sm' />
              ) : (
                <UpdateStatus className='pad-edges-md' status={this.props.updateStatus} text={this.statusText()} />
              )}
            </div>
          </form>
        </div>
      </section>
    )
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearUpdateSettings, setChatOptOut }, dispatch)
}

ChatContainer.propTypes = {
  defaultChecked: PropTypes.bool,
  updateStatus: PropTypes.string,
  clearUpdateSettings: PropTypes.func.isRequired,
  setChatOptOut: PropTypes.func.isRequired,
}
export default connect(null, mapDispatchToProps)(ChatContainer)
