import React from 'react'
import PropTypes from 'prop-types'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'
import PageAlert from 'components/Messages/PageAlert'

const AccountExpired = (props) => {
  return (
    <PageAlert type='warning' id='accountExpired'>
      Your library account has expired. Please <ServiceNowLink>contact us</ServiceNowLink> for more information.
      {props.children}
    </PageAlert>
  )
}

AccountExpired.propTypes = {
  children: PropTypes.any,
}

export default AccountExpired
