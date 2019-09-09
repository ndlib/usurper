import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Interactive/Link'

const DateFilter = (props) => {
  return (
    <aside aria-label='Select archived month to display' role='navigation' className='dateFilter'>
      <div className='group'>
        <span className='nav-header'>Archive</span>
        <ul className='archive'>
          {
            Object.keys(props.eventDates).reverse().map((year) => {
              return (
                <li key={'filter_' + year} className={props.expanded.includes(year) ? 'expanded' : 'collapsed'}>
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
      </div>
    </aside>
  )
}

DateFilter.propTypes = {
  eventDates: PropTypes.object.isRequired,
  yearCallback: PropTypes.func.isRequired,
  expanded: PropTypes.array.isRequired,
}

export default DateFilter
