import React from 'react'
import PropTypes from 'prop-types'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import SideNavPresenter from './sideNavPresenter'

import './style.css'

const Sections = (column, showDescriptions) => {
  return column.fields.sections.map((entry) => {
    let s = entry.fields
    return (
      <div key={entry.sys.id} className='group'>
        <h3><a name={encodeURIComponent(s.title)} /><span>{s.title}</span></h3>
        <div className='linksgroup'><LibMarkdown>{ s.body }</LibMarkdown>
          {
          s.links.map((item) => {
            let link = item.fields.url ? item.fields.url : '/' + item.fields.slug
            return (
              <p key={item.sys.id}>
                <Link to={link}>{item.fields.title}</Link>
                { showDescriptions ? (<span>{item.fields.shortDescription}</span>) : null }
              </p>
            )
          })
        }
        </div>
      </div>
    )
  })
}

const ColumnContainerPresenter = (props) => {
  let page = props.cfPageEntry.fields

  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title={page.title} />
      <div className='row landing'>
        {
          page.columns.map((column, index) => {
            return (
              <div className='col-md-12 col-xs-12' key={'column_' + index}>
                { Sections(column, page.showDescriptions) }
              </div>
            )
          })
        }
      </div>
      <SideNavPresenter columns={page.columns} />
    </div>
  )
}

ColumnContainerPresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}
export default ColumnContainerPresenter
