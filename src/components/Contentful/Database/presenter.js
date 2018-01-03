// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Building from '../Building'
import Image from '../../Image'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const DatabasePresenter = ({ cfDatabaseEntry, fieldData }) => (
  <div key={`ContentfulDatabase_${cfDatabaseEntry.sys.id}`} className='container-fluid'>
    <PageTitle title={cfDatabaseEntry.fields.title} />
    <SearchProgramaticSet open={false} />

    <div className='row'>
      <main className='col-md-8 col-sm-7'>
        <LibMarkdown className='description'>{cfDatabaseEntry.fields.description}</LibMarkdown>
        <section>
          <h2>Database Access</h2>
          <ul className='databaseLink'>
            {
              cfDatabaseEntry.fields.urls.map((data) => {
                let linkText = cfDatabaseEntry.fields.urls.length > 1 ? data.title : cfDatabaseEntry.fields.title
                return (
                  <li key={data.url}>
                    <Link to={data.url}>{ linkText }</Link>
                    {
                      data.notes && <LibMarkdown>{ data.notes }</LibMarkdown>
                    }
                  </li>
                )
              })
            }
          </ul>
        </section>
        <section>
          <h2>Database Information</h2>
          {
            Object.keys(fieldData).map(key => {
              return (
                <div className='databaseInfo'>
                  <div className='infoLabel'>{fieldData[key].title}:</div>
                  <LibMarkdown className='infoValue'>{fieldData[key].data}</LibMarkdown>
                </div>
              )
            })
          }
          { cfDatabaseEntry.fields.alephSystemNumber && (
              <div className='databaseInfo'>
                <div className='infoLabel'>Catalog Number: </div>
                <Link className='infoValue' to={'http://onesearch.library.nd.edu/NDU:malc_blended:ndu_aleph' + cfDatabaseEntry.fields.alephSystemNumber}>
                  { cfDatabaseEntry.fields.alephSystemNumber }
                </Link>
              </div>
            )
          }
        </section>
      </main>
      <asside className='col-md-4 col-sm-5 col-xs-12 right desktop-only'>
        <Image cfImage={cfDatabaseEntry.fields.image} />
      </asside>
    </div>
  </div>
)

DatabasePresenter.propTypes = {
  cfDatabaseEntry: PropTypes.object.isRequired,
  fieldData: PropTypes.object,
}

export default DatabasePresenter
