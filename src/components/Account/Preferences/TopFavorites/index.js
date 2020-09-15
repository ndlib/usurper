import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import bookmark from 'static/images/bookmark.svg'
import gear from 'static/images/gear.png'
import Link from 'components/Interactive/Link'
import { KIND } from 'actions/personal/favorites'

const favoritesPath = '/preferences'

class TopFavorites extends Component {
  constructor (props) {
    super(props)
    this.favoritesSection = this.favoritesSection.bind(this)
  }

  favoritesSection (title, data) {
    // Only get the 4 highest priority items
    const items = data.sort((a, b) => a.order - b.order).slice(0, 4)

    if (!items.length) {
      return null
    }

    return (
      <div className='favorites-column'>
        <span className='subsection-title'>{title}</span>
        <div className='linksgroup'>
          { items.map((obj) => (
            <React.Fragment key={obj.itemKey}>
              <span className='link-arrow' />
              <p>
                <Link to={obj.url ? obj.url : `/${obj.itemKey}`} noTarget={!obj.url} aria-label={obj.title} className='favorite-link'>
                  {obj.title}
                </Link>
              </p>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  render () {
    return (
      <section className='group favorites'>
        <h2>
          <img src={bookmark} alt='' className='favorite white' />
          Favorites
          <Link to={favoritesPath} className='fright'>
            <img src={gear} alt='Manage Favorites' title='Manage Favorites' aria-label='Manage Favorites' />
          </Link>
        </h2>
        <div className='section-box'>
          <div className='favorites-column-container'>
            { this.favoritesSection('My Databases', this.props.favorites[KIND.databases].items || []) }
            { this.favoritesSection('My Subjects', this.props.favorites[KIND.subjects].items || []) }
          </div>
          <div className='row'>
            <Link to={favoritesPath} className='viewMore' arrow>
              View or Modify Favorites
            </Link>
          </div>
        </div>
      </section>
    )
  }
}

TopFavorites.propTypes = {
  favorites: PropTypes.object,
}

export const mapStateToProps = (state) => {
  const { favorites } = state

  return {
    favorites: favorites,
  }
}

export default connect(mapStateToProps)(TopFavorites)
