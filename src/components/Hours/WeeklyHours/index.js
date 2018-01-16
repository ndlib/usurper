import { connect } from 'react-redux'
import WeeklyHoursListPresenter from './presenter'

const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

export const mapStateToProps = (state, ownProps) => {
  if (ownProps.hours && Object.keys(ownProps.hours).length === 0) {
    return {
      hours: [],
      title: '',
      effectiveDate: '',
      showEffectiveDates: false,
    }
  }

  return {
    hours: groupedByKeys(ownProps.hours),
    title: ownProps.title,
    effectiveDate: effectiveDates(ownProps.hours[dayOrder[0]].date),
    showEffectiveDates: ownProps.showEffectiveDates,
  }
}

const groupedByKeys = (hours) => {
  let rows = []
  let startKey = dayOrder[0]
  let currentKey
  let nextKey
  for (let step = 0; step < dayOrder.length; step++) {
    currentKey = dayOrder[step]
    nextKey = dayOrder[step + 1]
    if (typeof nextKey === 'undefined' || hours[currentKey].rendered !== hours[nextKey].rendered) {
      rows.push({
        title: determineTitle(startKey, currentKey),
        rendered: hours[currentKey].rendered,
      })

      startKey = nextKey
    }
  }
  return rows
}

const determineTitle = (startKey, currentKey) => {
  if (currentKey === startKey) {
    return currentKey
  } else {
    return startKey + ' – ' + currentKey
  }
}

const effectiveDates = (startDate) => {
  return getDate(startDate)
}

const getDate = (dateString) => {
  let date = new Date(dateString + 'T23:59:59')
  return dayOrder[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate()
}

export default connect(mapStateToProps)(WeeklyHoursListPresenter)
