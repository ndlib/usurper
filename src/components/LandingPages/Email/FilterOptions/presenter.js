import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import * as helper from 'constants/HelperFunctions'

import styles from '../style.module.css'

const Presenter = (props) => {
  return (
    <div>
      {props.facets.map(facet => (
        <div key={facet.key} className={styles.formGroup}>
          <h2 className={styles.formGroupHeader}>
            Subscribe by {facet.label || helper.titleCase(facet.key)}
          </h2>
          <div className={styles.optionList}>
            {facet.options.map(option => (
              <label key={option.key}>
                <input
                  type='checkbox'
                  onChange={() => props.onOptionChange(facet.key, option.key)}
                  checked={typy(props.selectedOptions, facet.key).safeArray.includes(option.key)}
                />
                <span className={styles.optionText}>{option.value}</span>
              </label>
            ))}
            <label>
              <input type='checkbox' checked={typy(props.selectedOptions, facet.key).safeArray.length === 0} disabled />
              <span className={styles.optionText}>All</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  )
}

Presenter.propTypes = {
  facets: PropTypes.arrayOf(PropTypes.shape({
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      selected: PropTypes.bool.isRequired,
    })).isRequired,
  })).isRequired,
  onOptionChange: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
}

export default Presenter
