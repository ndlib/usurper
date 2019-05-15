import React from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'

const Wizard = (props) => {
  return (
    <ReactModal
      isOpen
      shouldCloseOnEsc
      onRequestClose={props.onDismiss}
      contentLabel='Favorites Setup'
      className='modal'
      overlayClassName='modal-overlay'
      ariaHideApp
      aria={{ labelledby: 'favoritesModalTitle', describedby: 'favoritesModalDesc' }}
      shouldFocusAfterRender
      shouldReturnFocusAfterClose
    >
      <section className='group'>
        <h3 id='favoritesModalTitle'>
          <span>Favorites Setup</span>
          <div className='wizard-step-count-top'>{props.stepNumber}/{props.stepCount}</div>
          <div className='close-button' title='Close' aria-label='Close' onClick={props.onDismiss} />
        </h3>
        {props.children}
      </section>
    </ReactModal>
  )
}

Wizard.propTypes = {
  stepCount: PropTypes.number,
  stepNumber: PropTypes.number,
  onDismiss: PropTypes.func,
  children: PropTypes.any,
}

export default Wizard
