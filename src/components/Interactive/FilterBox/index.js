import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const FilterBox = (props) => {
  return (
    <div className={styles.filter}>
      <label role='search'>
        <span>{props.title}</span>
        <input
          type='search'
          value={props.value}
          onChange={props.onChange}
        />
      </label>
    </div>
  )
}

FilterBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
}

FilterBox.defaultProps = {
  value: '',
}

export default FilterBox
