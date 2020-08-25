// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import 'static/css/global.css'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ErrorLoading from 'components/Messages/Error'
import * as statuses from 'constants/APIStatuses'
import FilterBox from 'components/Interactive/FilterBox'
import OpenGraph from 'components/OpenGraph'
import Alphabet from './Alphabet'
import Facet from 'components/Interactive/Facet'
import Loading from 'components/Messages/Loading'
import PageAlert from 'components/Contentful/Alert/Page'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import Databases from './Databases'
import ActiveFiltersList from './ActiveFiltersList'

import Config from 'shared/Configuration'

import styles from './style.module.css'

const Loaded = (props) => {
  const titleLabel = 'Databases' + (props.filterValue ? `: SEARCH - ${props.filterValue.toUpperCase()}` : '')
  const openGraphDesc = (props.filterValue ? 'Search results for ' + props.filterValue : 'Databases matching filter')
  const fullActiveSubjects = props.subjects.filter(sub => props.activeSubjects.includes(sub.fields.id))
  return (
    <section className='container-fluid content-area'>
      <PageTitle title={titleLabel} />
      <OpenGraph title={titleLabel} description={openGraphDesc} image={false} />
      <SearchProgramaticSet open={false} />
      <PageAlert alerts={typy(props.contentfulPage, 'fields.alerts').safeArray} />
      <div className='row'>
        <div className={'col-xs-12 col-md-8 col-sm-7 ' + styles.content}>
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
        <div className={'col-xs-12 col-md-4 col-sm-5 ' + styles.sideNav}>
          <Alphabet history={props.history} onLetterFilterApply={props.onLetterFilterApply} />
          { Config.features.subjectFilteringEnabled && (
            <Facet
              name='subject'
              options={props.subjects.map(subject => ({
                key: subject.fields.id,
                value: subject.linkText,
              }))}
              selectedValues={props.activeSubjects}
              onChangeCallback={props.onSubjectFilterApply}
            />
          )}
          <StaticSidebar slug={props.slug} preview={false} inline />
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
  slug: PropTypes.string,
  contentfulPage: PropTypes.shape({
    fields: PropTypes.shape({
      alerts: PropTypes.object,
    }).isRequired,
  }),
}

ListPresenter.propTypes = {
  status: PropTypes.string,
}

export default ListPresenter
