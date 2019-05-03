import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { renewAleph, receiveRenewal } from 'actions/personal/alephRenewal'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

const RenewButton = (props) => {
  const renewAll = () => {
    props.items.forEach((item) => {
      if (item.barcode) {
        props.renewAleph(item.barcode, props.alephId)
      }
    })
    // set renewal of illiad items
    props.receiveRenewal(undefined, statuses.SUCCESS, { statusText: 'Please view item in ILL to renew' })
  }

  const labelText = 'Renew all renewable items'
  return (
    <button className='renew' onClick={renewAll} aria-label={labelText} disabled={props.disabled}>
      { helper.pluralize(props.items, 'Renew', 'Renew All') }
    </button>
  )
}

export const mapStateToProps = (state) => {
  const { personal } = state
  let expired = false
  if (personal.user.state === statuses.SUCCESS) {
    const dateString = String(personal.user.expiryDate)
    const date = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8))
    expired = date <= new Date()
  }

  return {
    alephId: personal.user.alephId,
    disabled: personal.user.alephId && !expired,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    renewAleph,
    receiveRenewal,
  }, dispatch)
}

RenewButton.propTypes = {
  items: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  alephId: PropTypes.string,
  renewAleph: PropTypes.func.isRequired,
  receiveRenewal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RenewButton)
