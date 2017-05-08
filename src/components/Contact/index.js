import React from 'react'
import PropTypes from 'prop-types'

function Contact (props) {
  return (
    <div className='contact'>
      <h3>{props.name}</h3>
      <a href={ 'tel:' + props.phone }>{ props.phone }</a><br />
      <a href={ 'mailto:' + props.email }>{ props.email }</a><br />
      <address>
        {props.addr1}
        <br />
        {props.addr2}
      </address>
    </div>
  )
}

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string,
  addr1: PropTypes.string,
  addr2: PropTypes.string,
}

export default Contact
