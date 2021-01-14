import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import 'static/css/global.css'
import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ErrorBoundary from 'components/ErrorBoundary'
import SummaryLink from 'components/DatabaseList/Databases/DatabaseSummary/SummaryLink'
import Config from 'shared/Configuration'
import { getLinkObject } from 'shared/ContentfulLibs'
import styles from './style.module.css'

const DatabasePresenter = ({ cfDatabaseEntry, fieldData }) => {
  const linkObject = getLinkObject(cfDatabaseEntry.fields, cfDatabaseEntry.sys.id)
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
            {linkObject.links.length > 0 && (
              <section>
                <h2>Database Access</h2>
                <ul className={'linkGroup ' + styles.dbLink}>
                  {linkObject.links.map((link) => (
                    <SummaryLink key={link.keyId} link={link} />
                  ))}
                </ul>
              </section>
            )}
            <section>
              <h2>Database Information</h2>
              {
                Object.keys(fieldData).map(key => {
                  return (
                    <div className={styles.dbInfo} key={key}>
                      <div className='infoLabel'>{fieldData[key].title}:</div>
                      <LibMarkdown className={styles.infoValue}>{fieldData[key].data}</LibMarkdown>
                    </div>
                  )
                })
              }
              { cfDatabaseEntry.fields.alephSystemNumber && (
                <div className={styles.dbInfo}>
                  <div className='infoLabel'>Catalog Number: </div>
                  <Link
                    className={styles.infoValue}
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
                  <ul className='linkGroup'>
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
