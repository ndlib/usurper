import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
ReactModal.setAppElement('#root')

class DeleteButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
    }
    this.onClick = this.onClick.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.deleteAction = this.deleteAction.bind(this)
    this.plural = this.plural.bind(this)
  }

  onClick () {
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  dismiss () {
    this.setState({ modalOpen: false })
  }

  deleteAction () {
    this.props.action()
    this.dismiss()
  }

  itemList (items) {
    let itemList = []
    items.forEach((item) => {
      itemList.push(<li key={item}>{item.title}</li>)
    })
    return itemList
  }

  plural () {
    if (this.props.items.length > 1) {
      return 's'
    }
    return null
  }

  render () {
    return (
      <React.Fragment>
        <button className='danger' onClick={this.onClick}>Delete</button>
        <ReactModal
          isOpen={this.state.modalOpen}
          shouldCloseOnEsc
          onRequestClose={this.dismiss}
          contentLabel='Delete Circulation History Item Confirmation'
          style={{ overlay: { backgroundColor: '#041F44aa' } }}
          ariaHideApp
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
          <h2>Delete Selected Item{this.plural()}?</h2>
          <p>Do you really want to delete the following item{this.plural()}?</p>
          <ul>
            {this.itemList(this.props.items)}
          </ul>
          <div className='pull-right-bottom modal-force-bottom'>
            <button
              className='danger'
              onClick={this.deleteAction}
            >Confirm</button>
            <button
              onClick={this.dismiss}
            >Cancel</button>
          </div>
        </ReactModal>
      </React.Fragment>
    )
  }
}

DeleteButton.propTypes = {
  action: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
}
export default DeleteButton
