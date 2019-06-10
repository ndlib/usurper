import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import Link from 'components/Interactive/Link'
import FavoriteIcon from '../../FavoriteIcon'

import moveIcon from 'static/images/move.png'
import trashIcon from 'static/images/trashcan.svg'

const FavoriteItem = (props) => {
  const onRemove = () => {
    props.onRemoveFavorite(props.kind, props.id)
  }

  return (
    <div className='favorite-list-item'>
      <Draggable draggableId={props.id} index={props.index} isDragDisabled={props.dragDisabled}>
        {(provided, snapshot) => (
          <div
            className={'favorite-list-item-draggable clearfix ' + (snapshot.isDragging ? 'dragging' : '')}
            {...provided.draggableProps} ref={provided.innerRef}
          >
            <FavoriteIcon
              kind={props.kind}
              isFavorited
              data={[ { key: props.id } ]}
              removeFavorite={props.onRemoveFavorite}
              disabled={!provided.dragHandleProps}
            />
            {props.title}&nbsp;
            <Link
              to={props.url ? props.url : `/${props.id}`}
              aria-label={props.title}
              className='item-title favorite-link'
              target='_blank'
              rel='noopener noreferrer'
            >(link)</Link>
            <span className='handle fright' disabled={!provided.dragHandleProps} {...provided.dragHandleProps}>
              <img src={moveIcon} alt='☰' />
            </span>
            <img src={trashIcon} className='fright remove-icon' alt='X' title='Remove' onClick={onRemove} />
          </div>
        )}
      </Draggable>
    </div>
  )
}

FavoriteItem.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
  dragDisabled: PropTypes.bool,
  onRemoveFavorite: PropTypes.func,
}

FavoriteItem.defaultProps = {
  dragDisabled: false,
}

export default FavoriteItem
