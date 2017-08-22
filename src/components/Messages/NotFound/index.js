import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import Link from '../../Link'
import ServiceNowLink from '../../ServiceNowLink'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound content'}>
    <SearchProgramaticSet open={true} />
    <PageTitle title='Page Not Found' />
    <div className='notfound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div>{ message }<br />
        If you think you've reached this page in error, please <ServiceNowLink>report your problem</ServiceNowLink>.
      </div>
    </div>
  </div>
)

export default NotFound
