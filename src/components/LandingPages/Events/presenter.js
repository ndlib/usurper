import React from 'react'
import { Route } from 'react-router'
import CurrentPresenter from './Current/presenter'
import PastPresenter from './Past/presenter'

const Events = (props) => {
  return (
    <div>
      <Route exact path='/events/current' render={() => <CurrentPresenter events={props.present} />} />
      <Route exact path='/events/past' render={() => <PastPresenter events={props.past} />} />
    </div>
  )
}

export default Events
