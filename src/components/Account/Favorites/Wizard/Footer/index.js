import React from 'react'
import PropTypes from 'prop-types'

import InlineLoading from 'components/Messages/InlineLoading'

const Footer = (props) => (
  <div className='modal-footer'>
    <div className='wizard-step-count-bottom'>{props.step + 1}/{props.stepCount}</div>
    { props.step > 0 && (
      <button className='favorites-wizard-prev' onClick={props.prevStep} disabled={props.saving}>
        Previous
      </button>
    )}
    { props.saving && (
      <InlineLoading title='' />
    )}
    { props.step < props.stepCount - 1 && (
      <span className='favorites-wizard-skip link-like' onClick={props.skipStep}>Skip this step &#187;</span>
    )}
    <button
      className={props.step === props.stepCount - 1 ? 'favorites-wizard-finish' : 'favorites-wizard-next'}
      onClick={props.nextStep}
      disabled={props.saving}
    >
      { props.step === props.stepCount - 1 ? 'Finish' : 'Next' }
    </button>
  </div>
)

Footer.propTypes = {
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
  skipStep: PropTypes.func.isRequired,
  saving: PropTypes.bool,
}

export default Footer
