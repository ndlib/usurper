import React from 'react'
import PropTypes from 'prop-types'

const Contact = (props) => {
  let name
  if (props.name) {
    name = <h3>{props.name}</h3>
  }

  let title
  if (props.title) {
    title = (<h4>{props.title}</h4>)
  }

  let phone
  if (props.phone) {
    phone = (<span><a href={'tel:' + props.phone}>{props.phone}</a><br /></span>)
  }

  let email
  if (props.email) {
    email = (<span><a href={'mailto:' + props.email}>{props.email}</a><br /></span>)
  }

  let addr1
  if (props.addr1) {
    addr1 = <span>{props.addr1}<br /></span>
  }

  let addr2
  if (props.addr2) {
    addr2 = <span>{props.addr2}</span>
  }

  let address
  if (addr1 || addr2) {
    address = (
      <address>
        {addr1}
        {addr2}
      </address>
    )
  }

  return (
    <div className='contact'>
      {name}
      {title}
      {phone}
      {email}
      {address}
    </div>
  )
}

Contact.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  addr1: PropTypes.string,
  addr2: PropTypes.string,
}

export default Contact
