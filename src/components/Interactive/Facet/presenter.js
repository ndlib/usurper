import React from 'react'
import PropTypes from 'prop-types'

import Accordion from '../Accordion'

import styles from './style.module.css'

const Presenter = (props) => {
  return (
    <aside aria-label={`Select ${props.label} to filter by`} role='navigation' className={styles.facets}>
      <Accordion
        className='group'
        header={'Filter by ' + props.label}
        headerClassName={styles.header}
        bodyClassName={styles.optionsBox}
        mobileOnly
      >
        {
          props.options.map(option => (
            <div key={option.key} className={styles.option}>
              <input
                type='checkbox'
                id={props.label + '_' + option.value.replace(/ /g,'_') }
                onChange={() => props.onFacetChange(option)}
                checked={option.selected}
              />
              <label htmlFor={props.label + '_' + option.value.replace(/ /g,'_') }>
                <button className={'custom-style link-like ' + styles.linkText} tabIndex={0} onClick={() => props.onFacetChange(option)}>
                  {option.value}
                </button>
              </label>
            </div>
          ))
        }
      </Accordion>
    </aside>
  )
}

Presenter.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  onFacetChange: PropTypes.func.isRequired,
}

export default Presenter
