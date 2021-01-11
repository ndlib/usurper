import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import PageTitle from 'components/Layout/PageTitle'
import SideNav from 'components/Layout/Navigation/SideNav'
import PageAlert from '../Alert/Page'
import OpenGraph from 'components/OpenGraph'
import Section from './Section'

const ColumnContainerPresenter = (props) => {
  const page = props.cfPageEntry.fields
  if (page && page.displayName) {
    return (
      <div className='content'>
        <SearchProgramaticSet open={false} />
        <PageTitle title={page.displayName} />
        <OpenGraph
          title={page.displayName}
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
              page.items.map((section) => {
                if (section && section.fields) {
                  const key = encodeURIComponent(section.fields.displayName)
                  return (
                    <a
                      className='side-anchors'
                      href={'#' + key}
                      key={key}>
                      <li>{section.fields.displayName}</li>
                    </a>
                  )
                }
                return null
              })
            }
          </ul>
        </SideNav>
        <div className='row landing'>
          {
            page.items.map((section, index) => {
              return (
                <div className='col-md-12 col-xs-12' key={'section_' + index}>
                  <Section entry={section} showDescriptions={typy(page, 'extraData.showDescriptions').safeBoolean} />
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
