// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import LibMarkdown from '../LibMarkdown'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Link from '../Link'
import Loading from '../Messages/Loading'
import PageNotFound from '../Messages/NotFound'
import ErrorLoading from '../Messages/Error'
import * as statuses from '../../constants/APIStatuses'

const Content = (letter, data) => {
  return (
    <div className='container-fluid content-area'>
      <PageTitle title={'Databases A-Z: ' + letter} />
      <SearchProgramaticSet open={false} />
      <h2>{'Databases: ' + letter.toUpperCase()}</h2>
      <hr />
      <div className='alphabet'>
      {
        'abcdefghijklmnopqrstuvwxyz'.split('').map((item) => {
          return (
            <span key={'letter_link_' + item} className='letter'>
              <Link to={item}>{ item.toUpperCase() }</Link>
            </span>
          )
        })
      }
      </div>

      <div className='row'>
        <div className='col-md-8'>
          {data}
        </div>
      </div>
    </div>
  )
}

const DBLoading = (letter) => {
  return Content(letter, 'Loading Databases')
}

const Loaded = (letter, list) => {
  return Content(letter,
    list.map((item) => {
      return (
        <div key={item.fields.alephSystemNumber + item.fields.title}>
          <Link to={item.fields.purl}>{item.fields.title}</Link>
          <p>{item.fields.description}</p>
        </div>
      )
    })
  )
}

const LetterNotFound = (letter) => {
  return Content(letter, 'Nothing found for this letter')
}

const ListPresenter = ({ cfDatabaseLetter, letter }) => {
  if (letter.length > 1) {
    return <PageNotFound />
  }

  switch (cfDatabaseLetter.status) {
    case statuses.FETCHING:
      return DBLoading(letter)
    case statuses.SUCCESS:
      return Loaded(letter, cfDatabaseLetter.json.fields[letter])
    case statuses.NOT_FOUND:
      return LetterNotFound(letter)
    default:
      return <ErrorLoading message='Error loading page' />
  }
}

ListPresenter.propTypes = {
  cfDatabaseLetter: PropTypes.object.isRequired,
  letter: PropTypes.string.isRequired,
}

export default ListPresenter
