'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Presenter from './presenter'
import Config from '../../../../../shared/Configuration'
import { renewAleph } from '../../../../../actions/personal/alephRenewal'

const illViewForm = '67'
const illWebForm = '75'

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRenewClick: (e) => {
      dispatch(renewAleph(ownProps.item.barcode, ownProps.alephId))
    },
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { itemAction } = state
  const { renewal, item, borrowed } = ownProps

  let renewMessage
  if (renewal && renewal[item.barcode] && borrowed) {
    let itemRenew = renewal[item.barcode].data
    if (itemRenew.statusText) {
      renewMessage = itemRenew.statusText
    } else if (itemRenew.renewStatus === 304) {
      renewMessage = 'Too early to renew. Try again closer to due date.'
    } else if (itemRenew.renewStatus === 200) {
      renewMessage = 'Renew Successful'
    }
  }

  return {
    actionResponse: itemAction,
    renewMessage: renewMessage,
    illWebUrl: Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber),
    illViewUrl: Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber),
    ...ownProps,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
