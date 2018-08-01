import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HoverToolTip from '../HoverToolTip'

class CircOptIn extends Component {
  constructor (props) {
    super(props)
    this.setStatus = this.setStatus.bind(this)
    this.state = {
      checkingStatus: true,
      statusShouldBeSaved: false,
    }
  }

  async componentWillMount () {
    const status = await this.props.getCircStatus()
    if (status && status.json) {
      console.log('saveHistory', status.json.saveHistory)
      this.setState({
        checkingStatus: false,
        statusShouldBeSaved: status.json.saveHistory })
    } else {
      this.setState({ checkingStatus: false })
    }
  }
  setStatus () {
    const targetCheckbox = document.getElementById('circ-opt-in')
    this.props.setCircStatus(targetCheckbox.checked)
    return true
  }

  render () {
    if (this.state.checkingStatus) {
      return null
    }
    return (
      <div className='col-md-12 col-xs-12'>
        <section className='group'>
          <h2>Circulation History</h2>
          <p>
            <input
              id='circ-opt-in'
              type='checkbox'
              defaultChecked={this.state.statusShouldBeSaved} />
            <label htmlFor='circ-opt-in'>Save my Circulation History.<HoverToolTip>Here is some helpful text.</HoverToolTip></label>
            <span style={{ float: 'right' }}><button
              onClick={this.setStatus}>Save</button></span>
          </p>
        </section>
      </div>
    )
  }
}
CircOptIn.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
}
export default CircOptIn
