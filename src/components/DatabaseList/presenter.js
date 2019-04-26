// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ErrorLoading from 'components/Messages/Error'
import * as statuses from 'constants/APIStatuses'
import FilterBox from 'components/Interactive/FilterBox'
import OpenGraph from 'components/OpenGraph'
import SideNav from 'components/Layout/Navigation/SideNav'
import Alphabet from './Alphabet'
import Loading from 'components/Messages/Loading'
import Databases from './Databases'
import styles from './style.module.css'

const Loaded = (props) => {
  const titleLabel = props.filterValue ? `SEARCH - ${props.filterValue.toUpperCase()}` : props.letter.toUpperCase()
  const openGraphDesc = (props.filterValue ? 'Search results for ' : 'Databases with the letter ') + titleLabel
  return (
    <section className='container-fluid content-area'>
      <PageTitle title={'Databases: ' + titleLabel} />
      <OpenGraph title={'Databases: ' + titleLabel} description={openGraphDesc} image={false} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <SideNav className={'col-md-4 ' + styles.sideNav}><Alphabet /></SideNav>
        <div className='col-md-8'>
          <FilterBox
            title='Search All Databases by Title: '
            value={props.filterValue}
            onChange={props.onFilterChange}
            label='Database Search'
          />
          <div className='screenReaderText' aria-live='assertive'>{ props.assistText }</div>
          <Databases titleLabel={titleLabel} {...props} />
        </div>
      </div>
    </section>
  )
}

const ListPresenter = (props) => {
  switch (props.status) {
    case statuses.FETCHING:
      return <Loading />
    case statuses.SUCCESS:
    case statuses.NOT_FOUND:
      return Loaded(props)
    default:
      return <ErrorLoading message='Error loading page' />
  }
}

Loaded.propTypes = {
  list: PropTypes.array.isRequired,
  letter: PropTypes.string,
  assistText: PropTypes.string,
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
}

ListPresenter.propTypes = {
  status: PropTypes.string,
}

export default ListPresenter
