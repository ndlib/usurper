import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Interactive/Link'

const AccountBalance = (props) => {
  if (!props.balance || props.balance >= 0) {
    return null
  }

  const balanceStr = '-$' + Math.abs(props.balance)
  return (
    <div className='alert page lowPri'>
      <div className='width'>
        Your account balance is { balanceStr }.
        Please contact our <Link to='mailto:circ@nd.edu?subject=Billing'>circulation desk</Link> with questions.
      </div>
    </div>
  )
}

AccountBalance.propTypes = {
  balance: PropTypes.number,
}

export default AccountBalance
