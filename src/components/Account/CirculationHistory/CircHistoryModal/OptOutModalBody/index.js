import React from 'react'

const OptOutModalBody = () => {
  return (
    <div className='modal-body'>
      <h2 id='checkoutHistoryModalTitle'>Opt-out of Checkout History</h2>
      <div id='checkoutHistoryModalDesc'>
        You are selecting that you no longer wish to have your checkout history saved.
        <ul>
          <li>Items in your history cannot be deleted until 30 days after they are returned.</li>
          <li>Interlibrary Loan records cannot be deleted.</li>
          <li>Deleted items are lost permanently and cannot be restored.</li>
          <li>
            If you want to save a copy of your checkout history before deleting it, please select cancel,
            and use the export button in your checkout history.
          </li>
        </ul>
        Do you still wish to proceed with opting out?
      </div>
    </div>
  )
}

export default OptOutModalBody
