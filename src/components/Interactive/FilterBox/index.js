import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import styles from './style.module.css'

const FilterBox = (props) => {
  const hNum = typy(props.htag).isNumber ? props.htag : parseInt(props.htag.replace('h', ''))
  const headerTextEl = React.createElement((hNum > 0 && hNum <= 6) ? ('h' + hNum) : 'span', {
    className: styles.headerText,
  }, props.title)

  return (
    <div className={styles.filter}>
      <label role='search'>
        { headerTextEl }
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
  htag: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string, // Ex: '1', '4', 'h2', 'h4', etc.
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
}

FilterBox.defaultProps = {
  htag: 0,
  value: '',
}

export default FilterBox
