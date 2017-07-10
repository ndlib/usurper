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
        If you think you've reached this page in error, please <Link to='https://nd.service-now.com/ess/create_lib_incident.do'>report your problem</Link>.
      </div>
    </div>
  </div>
)

export default Error
