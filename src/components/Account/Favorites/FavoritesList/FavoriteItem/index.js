import React from 'react'
import PropTypes from 'prop-types'
import { Draggable } from 'react-beautiful-dnd'

import Link from 'components/Interactive/Link'
import FavoriteIcon from '../../FavoriteIcon'

import moveIcon from 'static/images/move.png'
import trashIcon from 'static/images/trashcan.svg'

import styles from './style.module.css'

const FavoriteItem = (props) => {
  const onRemove = () => {
    props.onRemoveFavorite(props.kind, props.id)
  }

  return (
    <div className={styles.favoriteListItem}>
      <Draggable draggableId={props.id} index={props.index} isDragDisabled={props.dragDisabled}>
        {(provided, snapshot) => (
          <div
            className={styles.favoriteListItemDraggable + ' clearfix ' + (snapshot.isDragging ? 'dragging' : '')}
            {...provided.draggableProps} ref={provided.innerRef}
          >
            <div className={styles.leftSide}>
              <FavoriteIcon
                kind={props.kind}
                isFavorited
                data={[ { key: props.id } ]}
                removeFavorite={props.onRemoveFavorite}
                disabled={!provided.dragHandleProps}
              />
              <Link
                to={props.url ? props.url : `/${props.id}`}
                aria-label={props.title}
                className={styles.title + ' favorites-link'}
                target='_blank'
                rel='noopener noreferrer'
              >{props.title}</Link>
            </div>
            <div className={styles.rightSide}>
              <img src={trashIcon} className={styles.removeIcon} alt='X' title='Remove' onClick={onRemove} />
              <span className={styles.handle} disabled={!provided.dragHandleProps} {...provided.dragHandleProps}>
                <img src={moveIcon} alt='☰' />
              </span>
            </div>
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
