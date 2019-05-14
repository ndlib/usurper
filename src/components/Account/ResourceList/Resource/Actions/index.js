import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import Config from 'shared/Configuration'
import { renewAleph } from 'actions/personal/alephRenewal'

import * as statuses from 'constants/APIStatuses'

const illViewForm = '67'
const illWebForm = '75'

export const ActionsContainer = (props) => {
  return (
    <Presenter {...props} />
  )
}

const renewMessage = (listType, data) => {
  if (listType !== 'borrowed') {
    return null
  }

  if (data.statusText) {
    return data.statusText
  } else if (data.renewStatus === 304) {
    return 'Too early to renew. Try again closer to due date.'
  } else if (data.renewStatus === 200) {
    return 'Renew Successful'
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRenewClick: () => {
      dispatch(renewAleph(ownProps.item.barcode))
    },
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, itemAction, renewal } = state
  const { item, listType } = ownProps

  let expired = false
  if (personal.user.state === statuses.SUCCESS) {
    const dateString = String(personal.user.expiryDate)
    const date = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8))
    expired = date <= new Date()
  }

  return {
    actionResponse: itemAction,
    renewMessage: renewMessage(listType, typy(renewal, `${item.barcode}.data`).safeObjectOrEmpty),
    illWebUrl: Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber),
    illViewUrl: Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber),
    alephId: personal.user.alephId,
    canRenew: personal.user.alephId && !expired,
    renewal: renewal,
  }
}

ActionsContainer.propTypes = {
  item: PropTypes.shape({
    barcode: PropTypes.string.isRequired,
  }),
  listType: PropTypes.string.isRequired,
  alephId: PropTypes.string,
  canRenew: PropTypes.bool,
  onRenewClick: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionsContainer)
