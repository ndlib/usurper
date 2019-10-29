import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import clearIcon from 'static/images/clear-icon.svg'
import styles from './style.module.css'

const Tags = (props) => {
  if (!props.groups.length) {
    return null
  }
  const classes = [styles.itemTag]
  if (!props.hasRemove) {
    classes.push(styles.small)
  }
  const children = []
  typy(props.groups).safeArray.forEach(group => {
    typy(group).safeArray.forEach(item => (
      children.push(
        <span
          key={item.key}
          className={classes.join(' ')}
          onClick={() => item.onClick(item)}
          title={props.hasRemove ? `Click to remove filter: ${item.value}` : ''}
        >
          { props.hasRemove && (
            <img src={clearIcon} className={styles.clearIcon} alt='X' />
          )}
          <span>{item.value}</span>
        </span>
      )
    ))
  })
  return children.length ? (props.inline ? <span>{children}</span> : <div>{children}</div>) : null
}

Tags.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onClick: PropTypes.func,
      }),
      PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
          onClick: PropTypes.func,
        })
      ),
    ])
  ).isRequired,
  hasRemove: PropTypes.bool,
  inline: PropTypes.bool,
}

export default Tags
