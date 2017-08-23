'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Presenter from './presenter'
import { renewAleph } from '../../../../../actions/personal/alephRenewal'

export const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onRenewClick: (e) => {
      dispatch(renewAleph(ownProps.item.barcode, ownProps.alephId))
    },
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { itemAction } = state

  return {
    actionResponse: itemAction,
    ...ownProps,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
