import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'

class ResourceContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true,
    }

    this.toggleHidden = this.toggleHidden.bind(this)
  }

  static getDerivedStateFromProps (props, state) {
    const data = typy(props.renewal, `[${props.item.barcode}].data`).safeObject
    if (state.hidden && data) {
      return {
        hidden: false,
      }
    }
    return null
  }

  toggleHidden () {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  render () {
    return (
      <Presenter
        item={this.props.item}
        listType={this.props.listType}
        toggleHidden={this.toggleHidden}
        hidden={this.state.hidden}
      />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { renewal } = state

  // If the item is renewed while on the page, override the due date of the prop orginally passed in
  const newItem = Object.assign({}, ownProps.item)
  const stateItem = typy(renewal, `[${ownProps.item.barcode}]`).safeObjectOrEmpty
  if (ownProps.listType === 'borrowed') {
    if (typy(stateItem, 'data.renewStatus').safeNumber === 200) {
      newItem.dueDate = renewal.data.dueDate
    }
  }

  return {
    renewal: renewal,
    item: newItem,
  }
}

ResourceContainer.propTypes = {
  renewal: PropTypes.object,
  item: PropTypes.shape({
    barcode: PropTypes.string,
    dueDate: PropTypes.string,
  }),
  listType: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(ResourceContainer)
