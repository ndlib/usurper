import React from 'react'
import PropTypes from 'prop-types'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import PageTitle from 'components/Layout/PageTitle'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'
import SideNav from 'components/Layout/Navigation/SideNav'
import PageAlert from '../Alert/Page'
import OpenGraph from 'components/OpenGraph'
import { getLinkObject } from 'shared/ContentfulLibs'
import InternalLink from 'components/Contentful/InternalLink'

import './style.css'

const Sections = (column, showDescriptions) => {
  return column.fields.sections.map((entry) => {
    const s = entry.fields
    if (!entry || !entry.fields || !entry.fields.title) {
      return null
    }
    return (
      <section key={entry.sys.id} className='group'>
        <h2><span id={encodeURIComponent(s.title)}>{s.title}</span></h2>
        <LibMarkdown>{ s.body }</LibMarkdown>
        <div className='linksgroup'>
          <div role={s.title + ' navigation'}>
            {
              s.links.map((item) => {
                if (item.sys.contentType.sys.id === 'internalLink') {
                  return (
                    <p key={item.sys.id}><InternalLink cfEntry={item} /></p>
                  )
                }
                const linkObject = getLinkObject(item.fields, item.sys.id)
                return (
                  <p key={item.sys.id}>
                    <Link to={linkObject.heading.url} className='item-title'>{linkObject.heading.title}</Link>
                    <span className='linkGroup'>
                      {
                        linkObject.conditionalLinks.map((data) => {
                          return data.url && <li key={data.keyId}><Link to={data.url}>{data.title}</Link></li>
                        })
                      }
                    </span>
                    { showDescriptions ? (<span>{linkObject.heading.description}</span>) : null }
                  </p>
                )
              })
            }
          </div>
        </div>
      </section>
    )
  })
}

const ColumnContainerPresenter = (props) => {
  const page = props.cfPageEntry.fields
  if (page && page.title) {
    return (
      <div className='content'>
        <SearchProgramaticSet open={false} />
        <PageTitle title={page.title} />
        <OpenGraph
          title={page.title}
          description={page.shortDescription}
          image={false}
        />
        <div className='columnAlertContainer'>
          <div className='col-md-12 col-xs-12'>
            <PageAlert alerts={page.alerts} />
          </div>
        </div>
        <SideNav className='side-nav-bg'>
          <ul>
            {
              page.columns.map((column) => {
                return column.fields.sections.map((section) => {
                  if (section && section.fields) {
                    const key = encodeURIComponent(section.fields.title)
                    return (
                      <a
                        className='side-anchors'
                        href={'#' + key}
                        key={key}>
                        <li>{section.fields.title}</li>
                      </a>
                    )
                  }
                  return null
                })
              })
            }
          </ul>
        </SideNav>
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

      </div>
    )
  }
  return null
}

ColumnContainerPresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}
export default ColumnContainerPresenter
