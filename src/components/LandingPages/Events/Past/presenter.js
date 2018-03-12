import React from 'react'
import PageTitle from '../../../PageTitle'
import SearchProgramaticSet from '../../../SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from '../../../Link'
import Calendar from '../Calendar'
import { withRouter } from 'react-router'

const Events = (props) => {
  return (
    <div className='content'>
      <Link to='/events' className='button fright tab'>Current Events</Link>
      <PageTitle title='Past Events' />
      <SearchProgramaticSet open={false} />
      <div className='row landing'>
        <div className='col-md-10 col-xs-10' >
          {
            props.events.map((entry, index) => makeEventEntry(entry, index, index === props.events.length - 1))
          }
        </div>
        <div className='col-md-2 col-xs-2'>
          <Calendar {...props} />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Events)
