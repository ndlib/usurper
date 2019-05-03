import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { deleteHistorical } from 'actions/personal/loanResources'
import InlineLoading from 'components/Messages/InlineLoading'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

ReactModal.setAppElement('body')

const modalProps = {
  contentLabel: 'Delete Checkout History Item Confirmation',
  overlayClassName: 'modal-overlay',
  style: {
    content: {
      top: '50%',
      bottom: 'auto',
      transform: 'translate(0, -50%)',
    },
  },
  aria: {
    labelledby: 'deleteModalTitle',
    describedby: 'deleteModalDesc',
  },
  ariaHideApp: true,
  shouldFocusAfterRender: true,
  shouldReturnFocusAfterClose: true,
  shouldCloseOnEsc: true,
}

class DeleteButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
    this.onClick = this.onClick.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
    this.itemList = this.itemList.bind(this)
  }

  onClick () {
    this.setState({
      modalOpen: !this.state.modalOpen,
    })
  }

  dismiss () {
    if (!this.props.deleting) {
      this.setState({
        modalOpen: false,
      })
    }
  }

  deleteAction () {
    const itemKey = this.props.items.length === 1 ? this.props.items[0].key : null

    this.props.dispatch(
      deleteHistorical(itemKey,
        () => { // success callback
          this.dismiss()
        },
        () => { // error callback
          this.dismiss()
        },
      )
    )
  }

  itemList () {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0))
    const dateThreshold = new Date(today).setDate(today.getDate() - 31)

    const itemList = []
    this.props.items.forEach((item) => {
      const d = item.returnDate ? new Date(item.returnDate) : today
      if (item.status === 'returned' && d.getTime() <= dateThreshold) {
        itemList.push(<li key={item.id}>{item.title}</li>)
      }
    })
    return itemList
  }

  render () {
    const removableItems = this.itemList()
    const disabled = removableItems.length === 0
    const hoverText = disabled ? 'Items cannot be deleted until 31 days after they were returned.' : ''

    return (
      <React.Fragment>
        <button className='delete' onClick={this.onClick} disabled={disabled} title={hoverText}>
          { helper.pluralize(this.props.items, 'Delete', 'Delete All') }
        </button>
        <ReactModal isOpen={this.state.modalOpen} onRequestClose={this.dismiss} {...modalProps}>
          <h2 id='deleteModalTitle'>Delete Selected { helper.pluralize(removableItems, 'Item') }?</h2>
          <p id='deleteModalDesc'>Do you really want to delete the following { helper.pluralize(removableItems, 'item')}?</p>
          <ul>{removableItems}</ul>
          { this.props.deleting && (
            <InlineLoading title='' />
          )}
          <div className='pull-right-bottom modal-force-bottom'>
            <button className='danger' onClick={this.deleteAction} disabled={this.props.deleting}>Confirm</button>
            <button onClick={this.dismiss} disabled={this.props.deleting}>Cancel</button>
          </div>
        </ReactModal>
      </React.Fragment>
    )
  }
}

export const mapStateToProps = (state) => {
  const { personal } = state
  return {
    deleting: personal.deleteHistorical.state === statuses.FETCHING,
  }
}

DeleteButton.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  deleting: PropTypes.bool,
}

export default connect(mapStateToProps)(DeleteButton)
