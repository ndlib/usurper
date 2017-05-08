// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import { Link } from 'react-router-dom'
import LibMarkdown from '../../LibMarkdown'
import NotFound from '../../NotFound'
import Loading from '../../Loading'
import Error from '../../Error'

const Page = (cfPageEntry) => (
  <div className={'ContentfulPage'}>
    <h1>{ cfPageEntry.fields.title }</h1>
    <LibMarkdown>{ cfPageEntry.fields.shortContent }</LibMarkdown>
    <LibMarkdown>{ cfPageEntry.fields.content }</LibMarkdown>
    <div><Link to={'/'}>Home</Link></div>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  switch(cfPageEntry.status){
    case 'fetching':
      return <Loading/>
    case 'success':
      return Page(cfPageEntry.json)
    case 'not found':
      return <NotFound/>
    default:
      return <Error message={ 'There was an error loading the page.' }/>
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
