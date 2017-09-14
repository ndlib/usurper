import React from 'react'
import PropTypes from 'prop-types'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import PageTitle from '../../PageTitle'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const Sections = (column, showDescriptions) => {
  return column.fields.sections.map((entry) => {
    let s = entry.fields
    return (
      <div key={entry.sys.id} className='group'>
        <h3><span>{s.title}</span></h3>
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

  let classes = 'col-md-6 col-xs-12'
  if (page.columns.length > 2) {
    classes = 'col-md-12 col-xs-12'
  }

  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title={page.title} />
      <div className='row landing'>
        {
          page.columns.map((column, index) => {
            return (
              <div className={classes} key={'column_' + index}>
                { Sections(column, page.showDescriptions) }
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

ColumnContainerPresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}
export default ColumnContainerPresenter
