import React from 'react'
import PageTitle from '../../../PageTitle'
import SearchProgramaticSet from '../../../SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from '../../../Link'
import Calendar from '../Calendar'
import { withRouter } from 'react-router'

const Current = (props) => {
  return (
    <div className='content'>
      <Link to='/events/past' className='button fright tab'>Past Events</Link>
      <PageTitle title='Current and Upcoming Events' />
      <SearchProgramaticSet open={false} />
      <div className='row landing'>
        <div className='col-md-10 col-xs-12' >
          {
            props.events.map((event, index) => makeEventEntry(event, index, index === props.events.length - 1))
          }
        </div>
        <div className='col-md-2 col-xs-12'>
          <Calendar {...props} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Current)
