'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class AskMenu extends Component {
  render () {
    if (this.props.open) {
      return (<div>Ask menu</div>)
    }
    return null
  }
}
AskMenu.propTypes = {
  open: PropTypes.bool
}

AskMenu.defaultProps = {
  open: false
}
export default AskMenu
