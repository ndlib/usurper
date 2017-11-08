import React from 'react'
import PageTitle from '../../../PageTitle'
import SearchProgramaticSet from '../../../SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from '../../../Link'

const Current = (props) => {
  return (
    <div className='content'>
      <Link to='/events/past' className='button fright tab'>Past Events</Link>
      <PageTitle title='Current and Upcoming Events' />
      <SearchProgramaticSet open={false} />
      <div className='row landing'>
        <div className='col-md-12 col-xs-12' >
          {
            props.events.map(makeEventEntry)
          }
        </div>
      </div>
    </div>
  )
}

export default Current
