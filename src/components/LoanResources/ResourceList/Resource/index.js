'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Presenter from './presenter'

class ResourceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true,
    }

    this.toggleHidden = this.toggleHidden.bind(this)
  }

  componentWillReceiveProps () {
    let item = this.props.item
    let renewal = this.props.renewal ? this.props.renewal[item.barcode] : null
    let previousDueDate = item.dueDate
    if (renewal && this.props.itemType !== 'Pending') {
      if (renewal.data.renewStatus === 200 && previousDueDate !== renewal.data.dueDate) {
        item.dueDate = renewal.data.dueDate
      }

      if (renewal.data) {
        this.setState({
          hidden: false,
        })
      }
    }
  }

  toggleHidden (event) {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  render () {
    return <Presenter toggleHidden={this.toggleHidden} hidden={this.state.hidden} {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

export default connect(mapStateToProps)(ResourceContainer)
