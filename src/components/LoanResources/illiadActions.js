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
  if (item.status === 'Delivered to Web') {
    webButton = (
      <Link
        to={Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber)}
        className='button'
      >
        View On Web
      </Link>
    )
  }

  return (
    <div className={item.title + 'illiadActions'}>
      <Link
        to={Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber)}
        className='button'
      >
        View in ILL
      </Link>
      { webButton }
    </div>
  )
}

IlliadActions.propTypes = {
  item: PropTypes.object.isRequired,
}

export default IlliadActions
