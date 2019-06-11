import React from 'react'

const OptInModalBody = () => {
  return (
    <div className='modal-body'>
      <h2 id='checkoutHistoryModalTitle'>Opt-in to Save Checkout History?</h2>
      <div id='checkoutHistoryModalDesc'>
        You are selecting that you no longer wish to have your checkout history saved.
        <ul>
          <li>
            By opting in, you agree that the Hesburgh Libraries can retain a complete record of your
            checkout history. This history will only be removed at your request.
          </li>
          <li>
            Only currently checked-out items, items returned in the last 30 days,
            and any items you borrow in the future will be included in your saved checkout history.
            Items returned more than 30 days ago have already been purged.
          </li>
          <li>You may opt-out and delete your checkout history at any time.</li>
        </ul>
        Do you wish to proceed with opting in?
      </div>
    </div>
  )
}

export default OptInModalBody
