import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'

const NotFound = ({ message }) => (
  <div className={'NotFound content'}>
    <SearchProgramaticSet open />
    <PageTitle title='Page Not Found' />
    <Helmet>
      <meta name='prerender-status-code' content='404' />
    </Helmet>
    <div className='notfound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div>{ message }<br />
        If you think you've reached this page in error,
        please <ServiceNowLink isWebContent>report your problem</ServiceNowLink>.
      </div>
    </div>
  </div>
)

NotFound.propTypes = {
  message: PropTypes.string.isRequired,
}

NotFound.defaultProps = {
  message: 'The requested page could not be found',
}

export default NotFound
