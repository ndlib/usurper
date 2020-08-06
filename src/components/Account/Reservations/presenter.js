import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import InlineLoading from 'components/Messages/InlineLoading'
import Table from 'components/Table'
import Link from 'components/Interactive/Link'
import AccountPageWrapper from '../AccountPageWrapper'

import styles from './style.module.css'

const ReservationsPresenter = ({ reservations, isLoading, startDate, endDate }) => {
  let title = `Reservations for ${startDate.format('MMMM Do')}`
  if (endDate.isValid() && !endDate.isSame(startDate)) {
    title += ' – ' + endDate.format('MMMM Do')
  }
  const columns = [
    { path: 'space', label: 'Space' },
    { path: 'date', label: 'Date/Time' },
    { path: 'status', label: 'Status' },
    { path: 'link', label: 'Details' },
  ]

  // Manipulate the table data so it is more presentable
  const tableData = typy(reservations).safeArray.map(reservation => ({
    space: reservation.space_name,
    date: `${moment(reservation.fromDate).format('MMM. Do, h:mma')} – ${moment(reservation.toDate).format('h:mma')}`,
    status: reservation.status,
    link: (
      <Link to={`https://libcal.library.nd.edu/spaces/booking/${reservation.bookId}`}>View in LibCal</Link>
    ),
  }))

  return (
    <AccountPageWrapper title={title} slug='reservations' className='account-reservations'>
      { isLoading ? (
        <InlineLoading title='Loading account info' />
      ) : (
        <Table columns={columns} data={tableData} className={styles.reservationsTable} />
      )}
    </AccountPageWrapper>
  )
}

ReservationsPresenter.propTypes = {
  reservations: PropTypes.array,
  isLoading: PropTypes.bool,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
}

export default ReservationsPresenter
