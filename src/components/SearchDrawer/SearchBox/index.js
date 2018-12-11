import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { openSearchBox, closeSearchBox } from '../../../actions/search.js'
import { setSearchOption } from '../../../actions/advancedSearch.js'
import searchQuery from '../searchQueryBuilder'
import Presenter from './presenter'
import ReactGA from 'react-ga'
import Config from '../../../shared/Configuration'
import QueryString from 'querystring'

ReactGA.initialize(Config.googleAnalyticsId, {
  debug: false,
  titleCase: false,
  gaOptions: {},
})

class SearchBox extends React.Component {
  constructor (props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    this.setState({
      searchId: 'basic-search-field',
      searchValue: this.props.defaultSearch,
      submitSearch: false,
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.submitSearch && !prevState.submitSearch) {
      ReactGA.event({
        category: `LIBRARY WEBSITE SEARCH SUBMISSION`,
        action: `${this.props.search.searchType}`,
        label: `${this.props.advancedSearch['basic-search-field']}`,
      })
      searchQuery(this.props.search, this.props.advancedSearch, this.props.history)

      this.setState({
        submitSearch: false,
      })
    }
  }

  onSubmit (e) {
    e.preventDefault()
    this.props.dispatch(setSearchOption(this.state.searchId, this.state.searchValue))
    this.setState({
      submitSearch: true,
    })
  }

  onChange (e) {
    this.setState({
      searchId: e.target.id,
      searchValue: e.target.value,
    })
  }

  render () {
    return (
      <Presenter onSubmit={this.onSubmit} onChange={this.onChange} {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const toggle = (e) => {
    if (ownProps.search.searchBoxOpen) {
      dispatch(closeSearchBox())
    } else {
      dispatch(openSearchBox())
    }
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  const qs = QueryString.parse(ownProps.location.search.replace('?', ''))

  return {
    dispatch: dispatch,
    defaultSearch: qs.q,
    onClick:(e) => {
      toggle(e)
    },
    onKeyDown: (e) => {
      // enter
      if (e.keyCode === 13) {
        dispatch(toggle(e))
        // down arrow
      } else if (e.keyCode === 40) {
        e.preventDefault()
        dispatch(openSearchBox())
        setTimeout(() => { document.getElementById('uSearchOption_0').focus() }, 50)
      }
    },
    onBlur: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox))
