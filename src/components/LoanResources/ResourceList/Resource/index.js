'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Loading from '../../../Messages/Loading'
import Presenter from './presenter'

class ListContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true,
    }

    this.toggleHidden = this.toggleHidden.bind(this)
  }

  toggleHidden (event) {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  render () {
    if (this.props.loading) {
      return <Loading />
    }

    return <Presenter toggleHidden={this.toggleHidden} hidden={this.state.hidden} {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

ListContainer.propTypes = {
  loading: PropTypes.bool,
}

export default connect(mapStateToProps)(ListContainer)
