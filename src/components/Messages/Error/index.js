import { connect } from 'react-redux'
import React from 'react'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import Link from '../../Link'

const Error = ({ message = 'An error has occured' }) => (
  <div className={'Error'}>
    <SearchProgramaticSet open={true} />
    <PageTitle title='Server Error' />
    <div className='notfound errored'>
      <h1>500</h1>
      <h2>Error</h2>
      <div>{ message }
        <br />
        If you think you've reached this page in error, please <Link to='https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936'>report your problem</Link>.
      </div>
    </div>
  </div>
)

export default Error
