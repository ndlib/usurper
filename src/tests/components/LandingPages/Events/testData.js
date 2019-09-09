// This helper is used to set up a bunch of differently dated events to use in tests
const makeEvent = (offsetStartDays, offsetEndDays) => {
  const startDate = new Date(new Date().setDate(new Date().getDate() + offsetStartDays))
  const endDate = offsetEndDays ? new Date(new Date().setDate(new Date().getDate() + offsetEndDays)) : startDate
  return {
    startDate,
    endDate,
  }
}

export const thirtyDaysAgoEvent = makeEvent(-30)
export const twentyNineDaysAgoEvent = makeEvent(-29)
export const previousEvent = makeEvent(-45, -1)
export const yesterdayEvent = makeEvent(-1, -1)
export const todayEvent = {
  // should be end of day so that when we look for current events, endDate > now
  startDate: new Date(new Date().setHours(23, 59, 59, 998)),
  endDate: new Date(new Date().setHours(23, 59, 59, 999)),
}
export const futureEvent = makeEvent(1, 3)
export const wayFutureEvent = makeEvent(100)
export const incompleteEvent = {
  startDate: new Date(),
  // no end date
}
// Intentionally ordered funky to make sure sorting works
export const allTestEvents = [
  futureEvent,
  thirtyDaysAgoEvent,
  twentyNineDaysAgoEvent,
  todayEvent,
  yesterdayEvent,
  incompleteEvent,
  wayFutureEvent,
  previousEvent,
]

export default allTestEvents