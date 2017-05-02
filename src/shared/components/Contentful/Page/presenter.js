// Presenter component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import LibMarkdown from '../../LibMarkdown'

class CFImage extends Component {
  render () {
    return (
      <img src='https://images.contentful.com/7alamuzf2nhi/FtB2BxnTc4UOAQc2aoGIs/7a39560375001ff6dc51cf5e6799fd75/CDS-Rooms.jpg' />
    )
  }
}

const Loading = (
  <span>loading</span>
)
const Loaded = (cfPageEntry) => (
  <div className={'ContentfulPage'}>
    <nav>
      <ul>
        <li><Link to={'/room-247'}>247</Link></li>
        <li><Link to={'/gis'}>gis</Link></li>
      </ul>
    </nav>
    <Link to={'/page/room-248'}>deep link</Link>
    <h1>{ cfPageEntry.fields.title }</h1>
    <LibMarkdown>{ cfPageEntry.fields.shortContent }</LibMarkdown>
    <LibMarkdown>{ cfPageEntry.fields.content }</LibMarkdown>
    <CFImage image={cfPageEntry.fields.image} />
    <div><Link to={ '/' }>Home</Link></div>
  </div>
)
const ErrorLoading = (
  <span>Error</span>
)

const NotFound = (
  <div className={'NotFound'}>
    <h1>Page Not Found</h1>
    <div>The requested page could not be found</div>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  if (cfPageEntry.isFetching) {
    return Loading
  }
  if (cfPageEntry.status === 'success') {
    return Loaded(cfPageEntry.json)
  } else if (cfPageEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
