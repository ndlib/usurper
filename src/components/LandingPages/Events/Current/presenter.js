import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from 'components/Interactive/Link'
import Calendar from '../Calendar'
import { withRouter } from 'react-router'

const Current = (props) => {
  return (
    <div className='content'>
      <Link to='/events/past' className='button fright tab'>Past Events</Link>
      <PageTitle title='Current and Upcoming Events' />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-9 col-xs-12' >
          {
            props.events.map((event, index) => makeEventEntry(event, index, index === props.events.length - 1))
          }
        </div>
        <div className='col-md-3 col-xs-12'>
          <Calendar {...props} />
        </div>
      </div>
    </div>
  )
}

Current.propTypes = {
  events: PropTypes.array,
}

export default withRouter(Current)
