// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Link from '../Link'
import PageNotFound from '../Messages/NotFound'
import ErrorLoading from '../Messages/Error'
import * as statuses from '../../constants/APIStatuses'

const Content = (letter, data) => {
  return (
    <div className='container-fluid content-area'>
      <PageTitle title={'Databases: ' + letter.toUpperCase()} />
      <SearchProgramaticSet open={false} />
      <section className='alphabet' aria-label='Select Databases by First Letter' role='navigation'>
      {
        'abcdefghijklmnopqrstuvwxyz'.split('').map((item) => {
          return (
            <span key={'letter_link_' + item} className='letter'>
              <Link to={'/databases/' + item} ariaLabel={'All "' + item.toUpperCase() + '" Databases'}>{ item.toUpperCase() }</Link>
            </span>
          )
        })
      }
      </section>

      <div className='row'>
        <div className='col-md-8'>
          <section aria-label={'List of all "' + letter.toUpperCase() + '" Databases'}>
            {data}
          </section>
        </div>
      </div>
    </div>
  )
}

const DBLoading = (letter) => {
  return Content(letter, 'Loading Databases')
}

const Loaded = (letter, list) => {
  if (!list) {
    return null
  }
  list.sort((left, right) => {
    let a = left.fields.title.toLowerCase()
    let b = right.fields.title.toLowerCase()

    if (a < b) {
      return -1
    } else if (b < a) {
      return 1
    }
    return 0
  })

  return Content(letter,
    list.map((item) => {
      return (
        <div key={item.fields.alephSystemNumber + item.fields.title}>
          <p aria-label={item.fields.title}>
            <Link to={item.fields.purl} title={'Go to ' + item.fields.title}>{item.fields.title}</Link><br />
            {item.fields.description}
            <Link to={'/database/' + item.sys.id} ariaLabel={'More Information about ' + item.fields.title} className='moreinfo'>More info</Link>
          </p>
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
