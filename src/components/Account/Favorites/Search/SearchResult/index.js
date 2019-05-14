import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FavoriteIcon from '../../FavoriteIcon'

class SearchResult extends Component {
  render () {
    return (
      <div className='favorite-list-item'>
        <div className={'favorite-list-item-draggable clearfix'}>
          <FavoriteIcon
            kind={this.props.kind}
            data={[
              {
                key: this.props.id,
                title: this.props.title,
                url: this.props.url,
              },
            ]}
            addFavorite={this.props.onAddFavorite}
            disabled={this.props.disabled}
          />
          {this.props.title}
        </div>
      </div>
    )
  }
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
