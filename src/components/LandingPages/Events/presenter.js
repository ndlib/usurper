import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route } from 'react-router'
import CurrentPresenter from './Current/presenter'
import PastPresenter from './Past'
import DatePresenter from './Date/presenter'

const Events = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path='/events' render={() => <CurrentPresenter events={props.present} allEvents={props.all} />} />
        <Route exact path='/events/past' render={() => <PastPresenter events={props.past} allEvents={props.all} />} />
        <Route
          exact path='/events/past/:date'
          render={
            () => {
              return <PastPresenter
                events={props.past}
                allEvents={props.all}
              />
            }
          }
        />
        <Route exact path='/events/:date' render={() => <DatePresenter events={props.all} />} />
      </Switch>
    </div>
  )
}

Events.propTypes = {
  all: PropTypes.array,
  past: PropTypes.array,
  present: PropTypes.array,
}
export default Events
