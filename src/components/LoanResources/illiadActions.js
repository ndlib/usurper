import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../shared/Configuration'
import Link from '../Link'

const illViewForm = '67'
const illWebForm = '75'

const IlliadActions = ({ item }) => {
  if (!item.transactionNumber) {
    return null
  }

  let webButton = null
  if (item.transactionStatus === 'Delivered to Web') {
    webButton = (
      <button>
        <Link to={Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber)}>
          View On Web
        </Link>
      </button>
    )
  }

  return (
    <div className={item.title + 'illiadActions'}>
      <button>
        <Link to={Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber)}>
          View in ILL
        </Link>
      </button>
      { webButton }
    </div>
  )
}

IlliadActions.propTypes = {
  item: PropTypes.object.isRequired,
}

export default IlliadActions
