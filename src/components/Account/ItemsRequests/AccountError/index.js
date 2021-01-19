import React from 'react'
import PropTypes from 'prop-types'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'
import PageAlert from 'components/Messages/PageAlert'

const AccountError = (props) => {
  return (
    <PageAlert type='warning' id='userLoadFailed'>
      <span>
        Unable to load account information. Please refresh the page, or <ServiceNowLink>contact us</ServiceNowLink> if you
        continue to experience issues.
        {props.children}
      </span>
    </PageAlert>
  )
}

AccountError.propTypes = {
  children: PropTypes.any,
}

export default AccountError
