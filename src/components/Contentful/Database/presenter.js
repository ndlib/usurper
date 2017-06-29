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

const FloorPresenter = ({ cfDatabaseEntry }) => (
  <div key={`ContentfulDatabase_${cfDatabaseEntry.sys.id}`} className='container-fluid'>
    <PageTitle title={cfDatabaseEntry.fields.title} />
    <h2>{cfDatabaseEntry.fields.title}</h2>
    <LibMarkdown>{cfDatabaseEntry.fields.description}</LibMarkdown>
    <Image cfImage={cfDatabaseEntry.fields.image} />
    <Link to={cfDatabaseEntry.fields.purl}>{'Go to ' + cfDatabaseEntry.fields.title}</Link>
  </div>
)

FloorPresenter.propTypes = {
  cfDatabaseEntry: PropTypes.object.isRequired,
}

export default FloorPresenter
