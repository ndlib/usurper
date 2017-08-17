import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import Link from '../../Link'

const NotFound = ({ message = 'The requested page could not be found'  }) => (
  <div className={'NotFound content'}>
    <SearchProgramaticSet open={true} />
    <PageTitle title='Page Not Found' />
    <div className='notfound'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <div>{ message }<br />
		If you think you've reached this page in error, please <Link to='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936'>report your problem</Link>.
      </div>

    </div>
  </div>
)

export default NotFound
