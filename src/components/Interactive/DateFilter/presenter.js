import React from 'react'
import PropTypes from 'prop-types'

import Link from '../Link'
import Accordion from '../Accordion'

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
            Object.keys(props.entryDates).reverse().map((year) => {
              return (
                <li key={'filter_' + year} className={props.expanded.includes(year) ? styles.expanded : styles.collapsed}>
                  { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
                  <a className='yearFilter' onClick={props.yearCallback}>{year}</a>
                  <ul className={'monthFilter' + (props.expanded.includes(year) ? '' : ' hidden')}>
                    {
                      Object.keys(props.entryDates[year]).reverse().map((month) => {
                        return (
                          <li key={'filterMonth_' + month}>
                            <Link to={props.entryDates[year][month].url}>
                              {props.entryDates[year][month].display + ' (' + props.entryDates[year][month].count + ')'}
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
  entryDates: PropTypes.object.isRequired,
  yearCallback: PropTypes.func.isRequired,
  expanded: PropTypes.array.isRequired,
}

export default DateFilter
