import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Card from './Card'
import TitleCard from './TitleCard'
import ToolTip from '../ToolTip'
import FromIcon from '../FromIcon'

import typeConstants from '../../constants'

import styles from './style.module.css'

const getColumnList = (listType, isMobileDetails) => {
  if (isMobileDetails) {
    // Exclude the columns which are already visible from the extra details in mobile view
    const out = {}
    Object.keys(typeConstants[listType].columns).forEach(key => {
      if (!['title', 'dueDate'].includes(key)) {
        out[key] = typeConstants[listType].columns[key]
      }
    })
    return out
  }
  return typeConstants[listType].columns
}

const Cards = (props) => {
  const columns = getColumnList(props.listType, props.isMobileDetails)
  return (
    <React.Fragment>
      { Object.keys(columns).map((key) => {
        // Title isn't quite as generic so it has its own component
        if (key === 'title') {
          return <TitleCard key={key} listType={props.listType} {...props.item} />
        }
        const displayName = columns[key]
        const className = (props.isMobileDetails ? styles.mobileDetail : styles[key]) +
          (props.listType === 'history' ? ` ${styles.circHist}` : '')
        let value = ''
        if (key === 'renewable' && typy(props.item, key).isBoolean) {
          value = props.item[key] ? 'Yes' : 'No'
        } else {
          value = (key === 'dueDate' && props.item.from === 'ILL') ? 'Not Available' : typy(props.item, key).safeString
        }
        if (key === 'renewable' && props.item.from === 'ILL' && typy(props.item, key).isBoolean) {
          value = props.item[key] ? <ToolTip value={'Yes'} /> : <ToolTip value={'No'} />
        }
        if (props.isMobileDetails && !value) {
          return null
        }

        return (
          <Card key={key} className={className} value={value} label={displayName}>
            { props.isMobileDetails && (
              <span className={styles.detailLabel}>{displayName}: </span>
            )}
            { key === 'from' ? <FromIcon code={props.item.from} /> : <span className={styles.detailValue}>{value}</span>}
          </Card>
        )
      })}
    </React.Fragment>
  )
}

Cards.propTypes = {
  item: PropTypes.shape({
    from: PropTypes.string,
  }).isRequired,
  listType: PropTypes.string.isRequired,
  isMobileDetails: PropTypes.bool,
}

export default Cards
