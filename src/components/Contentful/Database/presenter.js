import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Interactive/Link'
import 'static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Image from '../../Image'
import PageTitle from '../../Layout/PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import ErrorBoundary from '../../ErrorBoundary'
import Config from 'shared/Configuration'

const DatabasePresenter = ({ cfDatabaseEntry, fieldData }) => {
  return (
    <ErrorBoundary>
      <div key={`ContentfulDatabase_${cfDatabaseEntry.sys.id}`} className='container-fluid'>
        <PageTitle title={cfDatabaseEntry.fields.title} subtitle={
          cfDatabaseEntry.fields.alternateTitles && cfDatabaseEntry.fields.alternateTitles.map((title, index) => {
            return <div key={'aka_' + index}>{title}</div>
          })
        } />
        <SearchProgramaticSet open={false} />

        <div className='row'>
          <main className='col-md-8 col-sm-7'>
            <LibMarkdown className='description'>{cfDatabaseEntry.fields.description}</LibMarkdown>
            <section>
              <h2>Database Access</h2>
              <ul className='databaseLink'>
                {
                // only use this if the field exists
                  cfDatabaseEntry.fields.urls && (
                    cfDatabaseEntry.fields.urls.map((data) => {
                      const linkText = cfDatabaseEntry.fields.urls.length > 1 ? data.title : cfDatabaseEntry.fields.title
                      return (
                        <li key={data.url}>
                          <Link to={data.url}>{ linkText }</Link>
                          {
                            data.notes && <LibMarkdown>{ data.notes }</LibMarkdown>
                          }
                        </li>
                      )
                    })
                  )
                }
                {
                // if that doesn't exist, use legacy information
                  !cfDatabaseEntry.fields.urls && (
                    <li key={cfDatabaseEntry.fields.purl}>
                      <Link to={cfDatabaseEntry.fields.purl}>{ cfDatabaseEntry.fields.title }</Link>
                    </li>
                  )
                }
              </ul>
            </section>
            <section>
              <h2>Database Information</h2>
              {
                Object.keys(fieldData).map(key => {
                  return (
                    <div className='databaseInfo' key={key}>
                      <div className='infoLabel'>{fieldData[key].title}:</div>
                      <LibMarkdown className='infoValue'>{fieldData[key].data}</LibMarkdown>
                    </div>
                  )
                })
              }
              { cfDatabaseEntry.fields.alephSystemNumber && (
                <div className='databaseInfo'>
                  <div className='infoLabel'>Catalog Number: </div>
                  <Link
                    className='infoValue'
                    to={
                      `${Config.onesearchBaseURL}/NDU:malc_blended:ndu_aleph${cfDatabaseEntry.fields.alephSystemNumber}`
                    }
                  >
                    { cfDatabaseEntry.fields.alephSystemNumber }
                  </Link>
                </div>
              )
              }
            </section>
            {
              (cfDatabaseEntry.fields.relatedResources && cfDatabaseEntry.fields.relatedResources.length) ? (
                <section>
                  <h2>Related Resources</h2>
                  <ul className='databaseLink'>
                    { cfDatabaseEntry.fields.relatedResources.map((data) => (
                      <li key={data.url}>
                        <Link to={data.url}>{ data.title ? data.title : data.url }</Link>
                        {
                          data.notes && <LibMarkdown>{ data.notes }</LibMarkdown>
                        }
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null
            }
          </main>
          <aside className='col-md-4 col-sm-5 col-xs-12 right desktop-only'>
            <Image cfImage={cfDatabaseEntry.fields.image} />
          </aside>
        </div>
      </div>
    </ErrorBoundary>
  )
}

DatabasePresenter.propTypes = {
  cfDatabaseEntry: PropTypes.object.isRequired,
  fieldData: PropTypes.object,
}

export default DatabasePresenter
