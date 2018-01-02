// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Link from '../Link'
import ErrorLoading from '../Messages/Error'
import * as statuses from '../../constants/APIStatuses'
import FilterBox from '../FilterBox'
import SideNav from '../SideNav'

const Content = (letter, data, filterValue, onFilterChange, assistText) => {
  return (
    <section className='container-fluid content-area'>
      <PageTitle title={'Databases: ' + letter.toUpperCase()} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8'>
          <FilterBox
            title='Search All Databases by Title: '
            value={filterValue}
            onChange={onFilterChange}
            label='Database Search'
          />
          <div className='screenReaderText' aria-live='assertive'>
            { assistText }
          </div>
          <section
            aria-label={'List of all "' + letter.toUpperCase() + '" Databases'}
            className='databaseList'
          >
            {data}
          </section>
        </div>
        <SideNav className='col-md-4'>
          <aside aria-label='Select Databases by First Letter' role='navigation'>
            <div className='group'>
              <h5>Filter by First Letter</h5>
              <div className='alphabet'>
                {
                  'abcdefghijklmnopqrstuvwxyz'.split('').map((item) => {
                    return (
                      <span key={'letter_link_' + item} className='letter'>
                        <Link to={'/databases/' + item} ariaLabel={'All "' + item.toUpperCase() + '" Databases'}>{ item.toUpperCase() }</Link>
                      </span>
                    )
                  })
                }
              </div>
            </div>
          </aside>
        </SideNav>
      </div>
    </section>
  )
}

const DBLoading = (letter) => {
  return Content(letter, 'Loading Databases')
}

const Loaded = (props) => {
  if (!props.list) {
    return null
  }

  let data = props.list.map((item) => {
    return (
      <div key={item.fields.alephSystemNumber + item.fields.title} aria-label={item.fields.title} className='dbSection'>
        <Link to={item.fields.purl} title={'Go to ' + item.fields.title}><h2>{item.fields.title}</h2></Link>
        <div className='multiline-ellipsis'>
          {item.fields.description}
        </div>
        <Link to={'/database/' + item.sys.id} className='moreinfo'
          ariaLabel={'More Information about ' + item.fields.title}>More info</Link>
      </div>
    )
  })

  if (props.filterValue && props.list.length === 50) {
    data.push(
      <div key='searchClipped'>
        <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
      </div>
    )
  }
  return Content(props.letter, data, props.filterValue, props.onFilterChange, props.assistText)
}

const LetterNotFound = (letter, filterValue, onFilterChange) => {
  return Content(letter, 'Nothing found for this letter', filterValue, onFilterChange)
}

const ListPresenter = (props) => {
  switch (props.status) {
    case statuses.FETCHING:
      return DBLoading(props.letter)
    case statuses.SUCCESS:
      return Loaded(props)
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
