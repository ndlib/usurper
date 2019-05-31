import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

import OptInModalBody from './OptInModalBody'
import OptOutModalBody from './OptOutModalBody'

import InlineLoading from 'components/Messages/InlineLoading'

ReactModal.setAppElement('body')

const CircHistoryModal = (props) => {
  const buttonClass = props.optedIn ? ' checkout-history-opt-out' : ' checkout-history-opt-in'
  return (
    <ReactModal
      isOpen={props.isOpen}
      shouldCloseOnEsc
      onRequestClose={props.onClose}
      contentLabel='Checkout History Confirmation'
      className='modal round-corners'
      overlayClassName='modal-overlay'
      ariaHideApp
      aria={{ labelledby: 'checkoutHistoryModalTitle', describedby: 'checkoutHistoryModalDesc' }}
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
    >
      { props.optedIn ? <OptOutModalBody /> : <OptInModalBody /> }
      <div className='modal-footer'>
        { props.updating && (<InlineLoading title='Updating... This may take a minute.' />)}
        <button onClick={props.onClose} disabled={props.updating}>Cancel</button>
        <button className={`danger ${buttonClass}`} onClick={props.onConfirm} disabled={props.updating}>Confirm</button>
      </div>
    </ReactModal>
  )
}

CircHistoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  optedIn: PropTypes.bool.isRequired,
  updating: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default CircHistoryModal
