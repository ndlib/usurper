import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import { deleteHistorical } from 'actions/personal/loanResources'
import InlineLoading from 'components/Messages/InlineLoading'
import * as statuses from 'constants/APIStatuses'

ReactModal.setAppElement('body')

class DeleteButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
    this.onClick = this.onClick.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
  }

  onClick () {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  dismiss () {
    if (!this.props.deleting) {
      this.setState({ modalOpen: false })
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

  itemList (items) {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0))
    const dateThreshold = new Date(today).setDate(today.getDate() - 31)

    const itemList = []
    items.forEach((item) => {
      const d = item.returnDate ? new Date(item.returnDate) : today
      if (item.status === 'returned' && d.getTime() <= dateThreshold) {
        itemList.push(<li key={item.id}>{item.title}</li>)
      }
    })
    return itemList
  }

  render () {
    const removableItems = this.itemList(this.props.items)
    const plural = removableItems.length === 1 ? '' : 's'
    const disabled = removableItems.length === 0
    const hoverText = disabled ? 'Items cannot be deleted until 31 days after they were returned.' : ''

    return (
      <React.Fragment>
        <button className='delete' onClick={this.onClick} disabled={disabled} title={hoverText}>
          {this.props.items.length === 1 ? 'Delete' : 'Delete All'}
        </button>
        <ReactModal
          isOpen={this.state.modalOpen}
          shouldCloseOnEsc
          onRequestClose={this.dismiss}
          contentLabel='Delete Checkout History Item Confirmation'
          style={{
            overlay: {
              backgroundColor: '#041F44aa',
              zIndex: '1000',
            },
            content: {
              top: '50%',
              bottom: 'auto',
              transform: 'translate(0, -50%)',
            },
          }}
          ariaHideApp
          aria={{
            labelledby: 'deleteModalTitle',
            describedby: 'deleteModalDesc',
          }}
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
          <h2 id='deleteModalTitle'>Delete Selected Item{plural}?</h2>
          <p id='deleteModalDesc'>Do you really want to delete the following item{plural}?</p>
          <ul>
            {removableItems}
          </ul>
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

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const deleting = get(personal.deleteHistorical, 'state', false) === statuses.FETCHING

  return {
    deleting: deleting,
  }
}

DeleteButton.propTypes = {
  items: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  deleting: PropTypes.bool,
}
export default connect(mapStateToProps)(DeleteButton)
