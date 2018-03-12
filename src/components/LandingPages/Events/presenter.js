import React from 'react'
import { Route } from 'react-router'
import CurrentPresenter from './Current/presenter'
import PastPresenter from './Past/presenter'
import DatePresenter from './Date/presenter'

const Events = (props) => {
  return (
    <div>
      <Route exact path='/events' render={() => <CurrentPresenter events={props.present} allEvents={props.all} />} />
      <Route exact path='/events/past' render={() => <PastPresenter events={props.past} allEvents={props.all} />} />
      <Route exact path='/events/:date' render={() => <DatePresenter events={props.all} />} />
    </div>
  )
}

export default Events
