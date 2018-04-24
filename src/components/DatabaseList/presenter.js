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
import OpenGraph from '../OpenGraph'
import SideNav from '../SideNav'
import LibMarkdown from '../LibMarkdown'
import Alphabet from './Alphabet'
import Loading from '../Messages/Loading'
import { getLinkObject } from '../../shared/ContentfulLibs'
import './style.css'

const Content = (letter, data, filterValue, onFilterChange, assistText) => {
  return (
    <section className='container-fluid content-area'>
      <PageTitle title={'Databases: ' + letter.toUpperCase()} />
      <OpenGraph
        title={'Databases: ' + letter.toUpperCase()}
        description={'Databases with the letter ' + letter.toUpperCase()}
        image={false}
      />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <SideNav className='col-md-4'>
          <Alphabet />
        </SideNav>
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

      </div>
    </section>
  )
}

const DBLoading = () => {
  return (<Loading />)
}

const Loaded = (props) => {
  if (!props.list) {
    return null
  }

  let data = props.list.map((item) => {
    let linkObject = getLinkObject(item.fields, item.sys.id)

    return (
      <section key={item.fields.alephSystemNumber + item.fields.title}
        aria-label={item.fields.title} className='dbSection'>
        <Link to={linkObject.heading.url} title={'Go to ' + item.fields.title}>
          <h2 className='dbItem'>{item.fields.title}</h2>
        </Link>
        <ul className='clamp databaseLink'>
          {
            linkObject.conditionalLinks.map((link) => {
              return (
                <li key={link.keyId}>
                  <Link to={link.url}>{link.title}</Link>
                  { link.notes && <LibMarkdown>{ link.notes }</LibMarkdown> }
                </li>
              )
            })
          }
        </ul>
        <div className='database-list'>
          {linkObject.heading.description}
        </div>
        <Link to={'/database/' + item.sys.id} className='moreinfo'
          ariaLabel={'More Information about ' + item.fields.title}>More info</Link>
      </section>
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
