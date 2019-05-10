import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Card from './Card'
import TitleCard from './TitleCard'
import FromIcon from '../FromIcon'

import typeConstants from '../../constants'

const Cards = (props) => {
  return (
    <React.Fragment>
      <TitleCard {...props.item} />
      { Object.keys(typeConstants[props.listType].columns).map((key) => {
        const displayName = typeConstants[props.listType].columns[key]
        const className = 'card-' + key
        const value = (key === 'returnDate' && props.item.from === 'ILL')
          ? 'Not Available'
          : typy(props.item, key).safeString

        return key === 'from'
          ? (
            <Card key={key} className={className} value={value} label={displayName}>
              <FromIcon code={props.item.from} />
            </Card>
          ) : (
            <Card key={key} className={className} value={value} label={displayName} />
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
}

export default Cards
