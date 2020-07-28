import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import Image from 'components/Image'

import styles from './style.module.css'

export class ModalImage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }

  handleOpenModal () {
    this.setState({ showModal: true })
  }

  handleCloseModal () {
    this.setState({ showModal: false })
  }

  render () {
    return (
      <div>
        <div onClick={this.handleOpenModal}><Image cfImage={this.props.photo} alt={this.props.altText} className={styles.modalThumbnail} /></div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={this.props.title}
          className='modal'
          overlayClassName='modal-overlay'
          ariaHideApp
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
        >
          <section className='group'>
            <h3>
              <div className={styles.modalHeader}>{this.props.title}</div>
              <div align='right'><button className='close-button' title='Close' aria-label='Close' onClick={this.handleCloseModal} /></div>
            </h3>
            <Image cfImage={this.props.photo} alt={this.props.altText} className={styles.modalImage} />
          </section>
        </ReactModal>
      </div>
    )
  }
}
export default ModalImage

ModalImage.propTypes = {
  photo: PropTypes.object.isRequired,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
