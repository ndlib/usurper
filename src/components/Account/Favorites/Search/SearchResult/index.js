import React from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from '../../FavoriteIcon'
import itemStyles from '../../FavoritesList/FavoriteItem/style.module.css'

const SearchResult = (props) => {
  return (
    <div className={itemStyles.favoriteListItemDraggable + ' clearfix'}>
      <div className={itemStyles.leftSide}>
        <FavoriteIcon
          kind={props.kind}
          data={[
            {
              itemKey: props.id,
              title: props.title,
              url: props.url,
            },
          ]}
          addFavorite={props.onAddFavorite}
          disabled={props.disabled}
        />
        <span className='link-like' onClick={() => props.onAddFavorite(props.kind, props.id, props.title, props.url)}>
          {props.title}
        </span>
      </div>
    </div>
  )
}

SearchResult.propTypes = {
  kind: PropTypes.string,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onAddFavorite: PropTypes.func,
}

SearchResult.defaultProps = {
  disabled: false,
}

export default SearchResult
