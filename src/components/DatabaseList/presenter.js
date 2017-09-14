// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Link from '../Link'
import ErrorLoading from '../Messages/Error'
import * as statuses from '../../constants/APIStatuses'

const Content = (letter, data, filterValue, onFilterChange) => {
  return (
    <div className='container-fluid content-area'>
      <PageTitle title={'Databases: ' + letter.toUpperCase()} />
      <SearchProgramaticSet open={false} />
      <label className='filter'>
        <strong>Search all Databases by Title: </strong>
        <input
          type='text'
          value={filterValue}
          onChange={onFilterChange}
          role='search' />
      </label>
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

const Loaded = (letter, list, filterValue, onFilterChange) => {
  if (!list) {
    return null
  }

  let data = list.map((item) => {
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

  if (filterValue && list.length === 50) {
    data.push(
      <div key='searchClipped'>
        <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
      </div>
    )
  }

  return Content(letter, data, filterValue, onFilterChange)
}

const LetterNotFound = (letter, filterValue, onFilterChange) => {
  return Content(letter, 'Nothing found for this letter', filterValue, onFilterChange)
}

const ListPresenter = (props) => {
  switch (props.status) {
    case statuses.FETCHING:
      return DBLoading(props.letter)
    case statuses.SUCCESS:
      return Loaded(props.letter, props.list, props.filterValue, props.onFilterChange)
    case statuses.NOT_FOUND:
      return LetterNotFound(props.letter, props.filterValue, props.onFilterChange)
    default:
      return <ErrorLoading message='Error loading page' />
  }
}

ListPresenter.propTypes = {
  list: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired,
  letter: PropTypes.string.isRequired,

  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
}

export default ListPresenter
