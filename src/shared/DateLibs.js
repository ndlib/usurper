// transforms a date to formatted date
// example output: January 23, 2018
export const formatDate = (rawDate) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  if (rawDate) {
    return new Date(rawDate).toLocaleString('en-US', options)
  }
  return null
}

export const hour12 = (date) => {
  let ampm = 'am'
  let hour = date.getHours()
  let minute = '' + date.getMinutes()

  minute = minute.padStart(2, '0')

  if (hour === 0) {
    hour = 12
  } else if (hour >= 12) {
    ampm = 'pm'
    if (hour > 12) {
      hour %= 12
    }
  }

  // 8:00am
  return `${hour}:${minute}${ampm}`
}

// return true if two dates fall on the same day
export const isSameDay = (start, end) => {
  return start.getMonth() === end.getMonth() &&
         start.getDay() === end.getDay() &&
         start.getYear() === end.getYear()
}

export const makeLocalTimezone = (stringDate) => {
  // local timezone offset string (eg -04:00)
  const givenTz = stringDate.slice(-6)

  // local timezone offset in minutes (eg 240)
  const localOffset = new Date().getTimezoneOffset()
  const localNeg = localOffset > 0 ? '-' : '+'
  // 240 / 60 = 4
  const hour = '' + Math.floor(Math.abs(localOffset / 60))
  // if we're in a zone with minute offsets
  const minute = '' + Math.abs(localOffset % 60)
  // combine above strings into the same fomrat as "givenTz"
  let stringLocalTz = `${localNeg}${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`

  // use our local timezone string for this information instead of the given one
  stringDate = stringDate.replace(givenTz, stringLocalTz)

  let ret = new Date(stringDate)
  let retOffset = ret.getTimezoneOffset()
  // if the changed date is in a different timezone than us (daylight savings) offset it back
  if (retOffset !== localOffset) {
    // in minutes
    let offset = localOffset - retOffset
    // to milliseconds
    offset = offset * 60 * 1000

    ret = new Date(ret.getTime() - offset)
  }

  return ret
}
