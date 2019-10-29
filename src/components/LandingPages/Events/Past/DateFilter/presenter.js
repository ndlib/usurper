import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Interactive/Link'
import Accordion from 'components/Interactive/Accordion'

import styles from './style.module.css'

const DateFilter = (props) => {
  return (
    <aside aria-label='Select archived month to display' role='navigation' className={styles.dateFilter}>
      <Accordion
        className='group'
        header='Archive'
        headerClassName='nav-header'
        bodyClassName={styles.archive}
        mobileOnly
        defaultExpanded
      >
        <ul>
          {
            Object.keys(props.eventDates).reverse().map((year) => {
              return (
                <li key={'filter_' + year} className={props.expanded.includes(year) ? styles.expanded : styles.collapsed}>
                  { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                  <a className='yearFilter' onClick={props.yearCallback}>{year}</a>
                  <ul className={'monthFilter' + (props.expanded.includes(year) ? '' : ' hidden')}>
                    {
                      Object.keys(props.eventDates[year]).reverse().map((month) => {
                        return (
                          <li key={'filterMonth_' + month}>
                            <Link to={props.eventDates[year][month].url}>
                              {props.eventDates[year][month].display + ' (' + props.eventDates[year][month].count + ')'}
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      </Accordion>
    </aside>
  )
}

DateFilter.propTypes = {
  eventDates: PropTypes.object.isRequired,
  yearCallback: PropTypes.func.isRequired,
  expanded: PropTypes.array.isRequired,
}

export default DateFilter
