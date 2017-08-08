import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageWrapper from './presenter.js'
import { closeSearchBox } from '../../actions/search.js'
import { closeMenus, fetchNavigation } from '../../actions/menu.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
    // Override children to be null if nav isn't yet loaded
    children: state.renderComponents ? ownProps.children : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickOnPage: () => {
      dispatch(closeSearchBox())
      dispatch(closeMenus())
    },
    fetchNavigation: (e) => {
      dispatch(fetchNavigation())
    },
  }
}

class PageWrapperContainer extends Component {
  componentWillMount () {
    this.props.fetchNavigation()
  }

  render () {
    return <PageWrapper {...this.props} />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapperContainer)
