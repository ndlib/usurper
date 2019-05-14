import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RadioList from 'components/Interactive/RadioList'
import UpdateStatus from 'components/Messages/UpdateStatus'
import InlineLoading from 'components/Messages/InlineLoading'

import { clearUpdateSettings, setHomeLibrary, KIND } from 'actions/personal/settings'
import * as states from 'constants/APIStatuses'

class PickUp extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: props.defaultValue,
    }

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onChange = (value) => {
    this.setState({
      selectedValue: value,
    })
    if (this.props.updateStatus === states.SUCCESS || this.props.updateStatus === states.ERROR) {
      this.props.clearUpdateSettings(KIND.homeLibrary)
    }
  }

  onSave = (event) => {
    event.preventDefault()
    if (this.props.updateStatus === states.FETCHING) {
      return null
    }

    this.props.setHomeLibrary(this.state.selectedValue)
  }

  render () {
    const statusText = this.props.updateStatus === states.SUCCESS
      ? 'Preferred location saved.'
      : (this.props.updateStatus === states.ERROR ? 'Preferred location failed to update.' : null)
    const radioEntries = this.props.entries.map((entry) => ({
      title: entry.fields.alternateTitle || entry.fields.title,
      value: entry.fields.slug,
    }))

    return (
      <section className='group preferred-location'>
        <h3>Preferred Location</h3>
        <div className='section-box pad-edges-sm'>
          <form onSubmit={this.onSave}>
            <span>Select your preferred location to display on the home screen.</span>
            <RadioList radioName='default_library' entries={radioEntries} defaultValue={this.props.defaultValue} onChangeCallback={this.onChange} />
            <button type='submit' className='right' aria-label='Save' disabled={!this.props.updateStatus === states.FETCHING}>
              Save
            </button>
            { this.props.updateStatus === states.FETCHING ? (
              <InlineLoading title='Saving' className='fright pad-edges-sm' />
            ) : (
              <UpdateStatus className='pad-edges-md' status={this.props.updateStatus} text={statusText} />
            )}
          </form>
        </div>
      </section>
    )
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearUpdateSettings, setHomeLibrary }, dispatch)
}

PickUp.propTypes = {
  entries: PropTypes.array.isRequired,
  setHomeLibrary: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  updateStatus: PropTypes.string,
  clearUpdateSettings: PropTypes.func.isRequired,
}
export default connect(null, mapDispatchToProps)(PickUp)
