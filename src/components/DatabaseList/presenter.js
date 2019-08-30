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
import Alphabet from './Alphabet'
import SubjectFacets from './SubjectFacets'
import Loading from 'components/Messages/Loading'
import Databases from './Databases'
import ActiveFiltersList from './ActiveFiltersList'

import Config from 'shared/Configuration'

import styles from './style.module.css'

const Loaded = (props) => {
  const titleLabel = 'Databases' + (props.filterValue ? `: SEARCH - ${props.filterValue.toUpperCase()}` : '')
  const openGraphDesc = (props.filterValue ? 'Search results for ' + props.filterValue : 'Databases matching filter')
  const fullActiveSubjects = props.subjects.filter(sub => props.activeSubjects.includes(sub.sys.id))
  return (
    <section className='container-fluid content-area'>
      <PageTitle title={titleLabel} />
      <OpenGraph title={titleLabel} description={openGraphDesc} image={false} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8'>
          <FilterBox
            htag='2'
            title='Search Databases by Title'
            value={props.filterValue}
            onChange={props.onFilterChange}
            label='Database Search'
          />
          <div className='screenReaderText' aria-live='assertive'>{ props.assistText }</div>
          { (fullActiveSubjects.length > 0 || props.filterLetter) && (
            <ActiveFiltersList
              subjects={fullActiveSubjects}
              letter={props.filterLetter}
              removeSubjectFromFilter={props.removeSubjectFromFilter}
              removeLetterFilter={props.removeLetterFilter}
            />
          )}
          <Databases titleLabel={titleLabel} subjectFilter={props.activeSubjects} {...props} />
        </div>
        <div className={'col-xs-12 col-md-4 ' + styles.sideNav}>
          <Alphabet history={props.history} onLetterFilterApply={props.onLetterFilterApply} />
          { Config.features.subjectFilteringEnabled && (
            <SubjectFacets
              subjects={props.subjects}
              activeSubjects={props.activeSubjects}
              onSubjectFilterApply={props.onSubjectFilterApply}
            />
          )}
        </div>
      </div>
    </section>
  )
}

const ListPresenter = (props) => {
  switch (props.status) {
    case statuses.NOT_FETCHED:
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
  filterLetter: PropTypes.string,
  assistText: PropTypes.string,
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  subjects: PropTypes.array,
  activeSubjects: PropTypes.array,
  onSubjectFilterApply: PropTypes.func,
  onLetterFilterApply: PropTypes.func,
  removeSubjectFromFilter: PropTypes.func,
  removeLetterFilter: PropTypes.func,
  history: PropTypes.object,
}

ListPresenter.propTypes = {
  status: PropTypes.string,
}

export default ListPresenter
