import React from 'react'
import PropTypes from 'prop-types'

const Contact = (props) => {
  let name
  if (props.name) {
    name = <h4 itemProp='name'>{props.name.trim()}</h4>
  }

  let title
  if (props.title) {
    title = (<h5 itemProp='jobTitle'>{props.title.trim()}</h5>)
  }

  let phone
  if (props.phone) {
    phone = (
      <span>
        <a
          href={'tel:' + props.phone}
          itemProp='telephone'
        >
          {props.phone.trim()}
        </a><br />
      </span>
    )
  }

  let email
  if (props.email) {
    email = (
      <span>
        <a
          href={'mailto:' + props.email}
          itemProp='email'
        >
          {props.email.trim()}
        </a><br />
      </span>
    )
  }

  let addr1
  if (props.addr1) {
    addr1 = <span itemProp='streetAddress'>{props.addr1.trim()}<br /></span>
  }

  let addr2
  if (props.addr2) {
    addr2 = <span>{props.addr2.trim()}</span>
  }

  let address
  if (addr1 || addr2) {
    address = (
      <div itemScope itemType='http://schema.org/PostalAddress' itemProp='address'>
        {addr1}
        {addr2}
      </div>
    )
  }

  return (
    <address className='contact' aria-label={props.name.trim()} itemScope itemType='http://schema.org/Person'>
      {name}
      {title}
      {phone}
      {email}
      {address}
    </address>
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
