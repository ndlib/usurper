import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getLinkObject } from 'shared/ContentfulLibs'
import { KIND } from 'actions/personal/favorites'
import Presenter from './presenter.js'

const DatabaseSummaryContainer = (props) => {
  const linkObject = getLinkObject(props.item.fields, props.item.sys.id)
  const isFavorited = !!(props.databaseFavorites.find((fav) => {
    return linkObject.links.find((link) => {
      return link.keyId === fav.key
    }) || linkObject.heading.url === fav.url
  }))
  const favoritesData = linkObject.links.map((link) => {
    let faveTitle = linkObject.heading.title
    if (link.title && link.title !== faveTitle) {
      faveTitle += ` - ${link.title}`
    }

    return {
      key: link.keyId,
      title: faveTitle,
      url: link.url,
    }
  })

  return (
    <Presenter item={props.item} linkObject={linkObject} isFavorited={isFavorited} favoritesData={favoritesData} />
  )
}

export const mapStateToProps = (state) => {
  const { favorites } = state

  return {
    databaseFavorites: favorites[KIND.databases].items || [],
  }
}

DatabaseSummaryContainer.propTypes = {
  item: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string,
    }),
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  databaseFavorites: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    url: PropTypes.string,
  })),
}

const DatabaseSummary = connect(mapStateToProps)(DatabaseSummaryContainer)
export default DatabaseSummary
