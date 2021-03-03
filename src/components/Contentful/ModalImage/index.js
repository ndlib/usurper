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
    const thumbnail = this.props.thumbnail || this.props.photo
    const thumbnailClasses = styles.modalThumbnail + (this.props.thumbnailClassName ? ` ${this.props.thumbnailClassName}` : '')
    return (
      <React.Fragment>
        <div onClick={this.handleOpenModal}>
          <Image cfImage={thumbnail} alt={this.props.altText} className={thumbnailClasses} itemProp='image' />
        </div>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel={this.props.title}
          className={`modal ${styles.modalPhotoOuterContainer}`}
          overlayClassName={`modal-overlay ${styles.modalOverlay}`}
          ariaHideApp
          shouldFocusAfterRender
          shouldReturnFocusAfterClose
          shouldCloseOnOverlayClick
          onRequestClose={this.handleCloseModal}
        >
          <section className='group'>
            <h3>
              <div className={styles.modalHeader}>{this.props.title}</div>
              <div align='right'><button className='close-button' title='Close' aria-label='Close' onClick={this.handleCloseModal} /></div>
            </h3>
            <Image
              cfImage={this.props.photo}
              alt={this.props.altText}
              className={styles.modalImage}
              containerClassName={styles.modalImageContainer}
            />
          </section>
        </ReactModal>
      </React.Fragment>
    )
  }
}
export default ModalImage

ModalImage.propTypes = {
  photo: PropTypes.object.isRequired,
  thumbnail: PropTypes.object,
  thumbnailClassName: PropTypes.string,
  altText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
