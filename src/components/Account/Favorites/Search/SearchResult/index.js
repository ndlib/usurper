import React from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from '../../FavoriteIcon'

const SearchResult = (props) => {
  return (
    <div className='favorite-list-item'>
      <div className={'favorite-list-item-draggable clearfix'}>
        <FavoriteIcon
          kind={props.kind}
          data={[
            {
              key: props.id,
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
