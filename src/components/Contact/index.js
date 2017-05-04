import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Contact extends Component {
  render () {
    return (
      <div className='contact'>
        <h3>{this.props.name}</h3>
        <a href={ 'tel:' + this.props.phone }>{ this.props.phone }</a><br />
        <a href={ 'mailto:' + this.props.email }>{ this.props.email }</a><br />
      </div>
    )
  }
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
}

export default Contact
