import React from 'react'

const AccountExpired = ({ message = 'Please contact campus Card Services for more information.' }) => (
  <div className='alert status failure' style={{ marginBottom: '1.5em' }}>
    Your <a href='https://irish1card.nd.edu/'>Irish1card</a> account has expired.
    {message}
  </div>
)

AccountExpired.propTypes = {
  message: PropTypes.string,
}

export default AccountExpired
