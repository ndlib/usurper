import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import styles from './style.module.css'

const ChatInvitation = (props) => {
  const [dismissing, setDismissing] = useState(false)
  const [dismissTimer, setDismissTimer] = useState()

  useEffect(() => {
    return () => clearTimeout(dismissTimer)
  }, [dismissTimer])

  const decline = () => {
    setDismissing(true)
    setDismissTimer(setTimeout(props.onClose, 5000))
  }

  return (
    <ReactModal
      isOpen
      shouldCloseOnEsc={dismissing}
      shouldCloseOnOverlayClick={dismissing}
      onRequestClose={props.onClose}
      contentLabel='Need help?'
      className={`modal round-corners ${styles.invite}`}
      overlayClassName='modal-overlay'
      ariaHideApp
      aria={{ labelledby: 'chatInvitationModalTitle', describedby: 'chatInvitationModalDesc' }}
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
    >
      { !dismissing ? (
        <React.Fragment>
          <div className='modal-body'>
            <h2 id='chatInvitationModalTitle'>Need Help?</h2>
            <div id='chatInvitationModalDesc'>
              Chat with us now.
            </div>
          </div>
          <div className='modal-footer'>
            <button onClick={decline} className='proactive-chat-decline'>No thanks</button>
            <button onClick={props.onConfirm} className='proactive-chat-accept'>Click to chat</button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='modal-body'>
            Okay. You can start a new chat with us at any time by clicking the chat icon in the lower right.
          </div>
          <div className='modal-footer'>
            <button onClick={props.onClose}>Close</button>
          </div>
        </React.Fragment>
      )}
    </ReactModal>
  )
}

ChatInvitation.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default ChatInvitation
