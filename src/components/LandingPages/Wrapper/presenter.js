import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import ActiveFilters from './ActiveFilters'
import LibMarkdown from 'components/LibMarkdown'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'
import Facet from 'components/Interactive/Facet'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'

import './style.css'

const Presenter = (props) => {
  // Convert label to lowercase and replace spaces with hyphen. (Ex: Sample Label -> sample-label)
  const classPrefix = props.typeLabel.toLowerCase().replace(/\s/g, '-')
  const hasFacets = Object.keys(props.facetValues).some(key => props.facetValues[key].length > 0)
  return (
    <div className='content'>
      { props.linkPath && (
        <Link to={props.linkPath} className='button fright tab'>{props.linkText}</Link>
      )}
      <PageTitle title={typy(props.dynamicPage, 'fields.title').safeString || props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className={`col-md-8 col-sm-7 col-xs-12 landing-page-list ${classPrefix}-list`}>
          { props.slug && (
            <StaticAlert slug={props.slug} preview={props.preview} hideLoading />
          )}
          <FilterBox value={props.filterValue} title={'Search ' + props.typeLabel} onChange={props.onFilterChange} />
          { hasFacets && (
            <ActiveFilters values={props.facetValues} onRemove={props.onFacetRemove} />
          )}
          <br />
          { props.entries.map(entry => {
            const card = props.entryCardComponent({
              ...props.entryCardProps,
              entry,
              facets: props.facets,
              onTagClick: props.onFacetApply,
            })
            return (
              <React.Fragment key={entry.id || entry.sys.id}>
                { card }
                <hr className='card-divider' />
              </React.Fragment>
            )
          })}
          {
            props.filterValue && props.entries.length === 50 && (
              <div className='searchClipped'>
                <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
              </div>
            )
          }
          { props.slug && (
            <StaticBody slug={props.slug} preview={props.preview} hideLoading>
              <LibMarkdown>{typy(props.dynamicPage, 'fields.body').safeString}</LibMarkdown>
            </StaticBody>
          )}
        </div>
        <div className={`col-md-4 col-sm-5 col-xs-12 right landing-page-sidebar ${classPrefix}-sidebar`}>
          { props.children }
          { typy(props.facets).safeArray.map(facet => {
            // Default to using field name if no key provided
            const facetKey = facet.key || facet.fieldName
            return (
              <Facet
                key={facetKey}
                name={facetKey}
                label={facet.label}
                options={facet.options}
                selectedValues={props.facetValues[facetKey]}
                onChangeCallback={props.onFacetApply}
              />
            )
          })}
          { props.afterFacetsChildren }
        </div>
      </div>
    </div>
  )
}

Presenter.propTypes = {
  linkPath: PropTypes.string,
  linkText: PropTypes.string,
  pageTitle: PropTypes.string,
  entries: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  typeLabel: PropTypes.string.isRequired,
  children: PropTypes.any,
  afterFacetsChildren: PropTypes.any,
  entryCardComponent: PropTypes.func.isRequired,
  entryCardProps: PropTypes.object,
  onFacetApply: PropTypes.func.isRequired,
  onFacetRemove: PropTypes.func.isRequired,
  facets: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    fieldName: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })),
  })),
  facetValues: PropTypes.object.isRequired,
  slug: PropTypes.string,
  preview: PropTypes.bool,
  dynamicPage: PropTypes.object,
}

export default Presenter
