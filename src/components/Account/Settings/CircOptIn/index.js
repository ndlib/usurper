import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { KIND } from '../../../../actions/personal/settings'
import * as statuses from 'constants/APIStatuses'
import InlineLoading from '../../../Messages/InlineLoading'

ReactModal.setAppElement('body')

class CircOptIn extends Component {
  constructor (props) {
    super(props)
    this.confirmToggleStatus = this.confirmToggleStatus.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.state = {
      checkingStatus: true,
      statusShouldBeSaved: false,
      updated: false,
      modalOpen: false,
      error: '',
    }
  }

  dismiss () {
    if (!this.props.updating) {
      this.setState({ modalOpen: false })
    }
  }

  componentDidUpdate (prevProps) {
    // If opting out completed, dismiss the confirmation modal
    if (prevProps.updating && !this.props.updating && !this.state.statusShouldBeSaved) {
      this.dismiss()
    }
  }

  async componentDidMount () {
    const status = await this.props.getCircStatus()
    if (status && status.json) {
      this.setState({
        checkingStatus: false,
        statusShouldBeSaved: status.json.saveHistory })
    } else {
      this.setState({ checkingStatus: false })
    }
  }
  toggleStatus = () => {
    this.setState({ updated: false })
    if (!this.state.statusShouldBeSaved) {
      // Opt-in happens immediately without confirmation modal
      this.confirmToggleStatus()
    } else {
      this.setState({ modalOpen: true })
    }
  }

  confirmToggleStatus () {
    const newStatus = !this.state.statusShouldBeSaved
    this.props.setCircStatus(newStatus)
    this.setState({
      updated: true,
      statusShouldBeSaved: newStatus,
      error: '',
    })
  }

  render () {
    if (this.state.checkingStatus) {
      return null
    }
    const visibility = this.state.updated ? 'visible' : 'hidden'
    return (
      <React.Fragment>
        <div className='col-md-12 col-xs-12'>
          <section className='group opt-in'>
            <h2>Checkout History</h2>
            <div className='section-box'>
              <div>
                <input
                  id='circ-opt-in'
                  type='checkbox'
                  checked={this.state.statusShouldBeSaved}
                  disabled
                />
                <label htmlFor='circ-opt-in'>
                  {this.state.statusShouldBeSaved
                    ? 'You have opted to save your checkout history.'
                    : 'Your checkout history is not being saved.'
                  }
                </label>
                <span style={{ float: 'right' }}>
                  <button
                    onClick={this.toggleStatus}
                    className={this.state.statusShouldBeSaved ? '' : 'checkout-history-opt-in'}
                  >
                    {this.state.statusShouldBeSaved
                      ? 'Opt-out and delete history'
                      : 'Opt-in to save history'
                    }
                  </button>
                </span>
              </div>
              <div
                className='success'
                style={{ display: 'inline', marginLeft: '2em', visibility: visibility }}
              >{this.state.error ? this.state.error : 'Your preference has been updated.'}</div>
            </div>
            <hr />
            <ul className='circ-policy'>
              <li>
                The Hesburgh Libraries values your privacy and the confidentiality of your borrowing records and
                checkout history.
              </li>
              <li>
                No borrower information is released to third parties including outside agencies or individuals
                without a court order.
              </li>
              <li>
                Please be aware that the library retains each item in your checkout history for 30 days after
                it is returned, in case there are any issues. The library will not be able to purge your individual
                records during th​at​ rolling 30​ day​ period.
              </li>
              <li>Interlibrary loan records are not able to be purged at any point.</li>
              <li>
                You may choose to have your checkout history retained and ​remain​ available to you ​as long as you
                are affiliated with the University​ by opting in on this page.​ After you opt in, you may choose to
                delete individual items, or opt out and delete your entire history.
              </li>
              <li>
                Please note that once you opt-in to save your checkout history, only currently checked-out items,
                items returned in the last 30 days, and any items you borrow in the future will be included in your
                saved checkout history. Items returned more than 30 days ago have already been purged.
              </li>
            </ul>
          </section>
        </div>
        <ReactModal
          isOpen={this.state.modalOpen}
          shouldCloseOnEsc
          onRequestClose={this.dismiss}
          contentLabel='Opt-out Checkout History Confirmation'
          style={{
            overlay: {
              backgroundColor: '#041F44aa',
              zIndex: '1000',
            },
            content: {
              top: '50%',
              bottom: 'auto',
              transform: 'translate(0, -50%)',
            },
          }}
          ariaHideApp
          aria={{
            labelledby: 'optOutModalTitle',
            describedby: 'optOutModalDesc',
          }}
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
          <h2 id='optOutModalTitle'>Opt-out of Checkout History?</h2>
          <div id='optOutModalDesc'>
            You are selecting that you no longer wish to have your checkout history saved.
            <ul>
              <li>
                Items in your history cannot be deleted until 30 days after they are returned.
              </li>
              <li>
                Interlibrary Loan records cannot be deleted.
              </li>
              <li>
                Deleted items are lost permanently and cannot be restored.
              </li>
              <li>
                If you want to save a copy of your checkout history before deleting it, please select cancel,
                and use the export button in your checkout history.
              </li>
            </ul>
            Do you still wish to proceed with opting out?
          </div>
          { this.props.updating && (
            <InlineLoading title='' />
          )}
          <div className='pull-right-bottom modal-force-bottom'>
            <button
              className={'danger' + (this.state.statusShouldBeSaved ? ' checkout-history-opt-out' : '')}
              onClick={this.confirmToggleStatus}
              disabled={this.props.updating}
            >
              Confirm
            </button>
            <button onClick={this.dismiss} disabled={this.props.updating}>Cancel</button>
          </div>
        </ReactModal>
      </React.Fragment>
    )
  }
}

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export const mapStateToProps = (state) => {
  const { settings } = state
  const updating = get(settings[KIND.circStatus], 'state', false) === statuses.FETCHING

  return {
    updating: updating,
  }
}

CircOptIn.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
  updating: PropTypes.bool,
}
export default connect(mapStateToProps)(CircOptIn)
