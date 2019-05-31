import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KIND, getCircStatus, setCircStatus } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'

ReactModal.setAppElement('body')

class CircOptIn extends Component {
  constructor (props) {
    super(props)
    this.confirmToggleStatus = this.confirmToggleStatus.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.state = {
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
      error: '',
    })
  }

  render () {
    if (this.props.circStatus === statuses.NOT_FETCHED || this.props.circStatus === statuses.FETCHING) {
      return <InlineLoading />
    }
    const statusText = () => {
      switch (this.props.updateStatus) {
        case statuses.SUCCESS:
          return this.props.optedIn ? 'Successfully opted in.' : 'Successfully opted out.'
        case statuses.ERROR:
          return 'Failed to update preference. Please refresh and try again.'
        default:
          return null
      }
    }

    return (
      <React.Fragment>
        <section className='group opt-in'>
          <h3>Checkout History</h3>
          <div className='section-box'>
            <input
              id='circ-opt-in'
              type='checkbox'
              checked={this.props.optedIn}
              disabled
            />
            <label htmlFor='circ-opt-in'>
              {this.props.optedIn
                ? 'You have opted to save your checkout history.'
                : 'Your checkout history is not being saved.'
              }
            </label>
            <button className='right' onClick={this.openModal}>
              {this.props.optedIn
                ? 'Opt-out and delete history'
                : 'Opt-in to save history'
              }
            </button>
            <UpdateStatus className='pad-edges-md' status={this.props.updateStatus} text={statusText()} />
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
        <ReactModal
          isOpen={this.state.modalOpen}
          shouldCloseOnEsc
          onRequestClose={this.dismiss}
          contentLabel='Checkout History Confirmation'
          className='modal round-corners'
          overlayClassName='modal-overlay'
          ariaHideApp
          aria={{
            labelledby: 'checkoutHistoryModalTitle',
            describedby: 'checkoutHistoryModalDesc',
          }}
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
          {this.props.optedIn ? (
            <div className='modal-body'>
              <h2 id='checkoutHistoryModalTitle'>Opt-out of Checkout History?</h2>
              <div id='checkoutHistoryModalDesc'>
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
            </div>
          ) : (
            <div className='modal-body'>
              <h2 id='checkoutHistoryModalTitle'>Opt-in to Save Checkout History?</h2>
              <div id='checkoutHistoryModalDesc'>
                You are selecting that you no longer wish to have your checkout history saved.
                <ul>
                  <li>
                    By opting in, you agree that the Hesburgh Libraries can retain a complete record of your
                    checkout history. This history will only be removed at your request.
                  </li>
                  <li>
                    Only currently checked-out items, items returned in the last 30 days,
                    and any items you borrow in the future will be included in your saved checkout history.
                    Items returned more than 30 days ago have already been purged.
                  </li>
                  <li>
                    You may opt-out and delete your checkout history at any time.
                  </li>
                </ul>
                Do you wish to proceed with opting in?
              </div>
            </div>
          )}
          <div className='modal-footer'>
            { this.props.updating && (
              <InlineLoading title='Updating... This may take a minute.' />
            )}
            <button onClick={this.dismiss} disabled={this.props.updating}>Cancel</button>
            <button
              className={'danger' + (this.props.optedIn ? ' checkout-history-opt-out' : ' checkout-history-opt-in')}
              onClick={this.confirmToggleStatus}
              disabled={this.props.updating}
            >
              Confirm
            </button>
          </div>
        </ReactModal>
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

CircOptIn.propTypes = {
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
  circStatus: PropTypes.string.isRequired,
  optedIn: PropTypes.bool,
  updateStatus: PropTypes.string.isRequired,
  updating: PropTypes.bool,
}
export default connect(mapStateToProps, mapDispatchToProps)(CircOptIn)
