// This helper is used to set up a bunch of differently dated exhibits to use in tests
const makeExhibit = (offsetStartDays, offsetEndDays) => {
  const startDate = new Date(new Date().setDate(new Date().getDate() + offsetStartDays))
  const endDate = offsetEndDays ? new Date(new Date().setDate(new Date().getDate() + offsetEndDays)) : startDate
  return {
    event: {
      startDate,
      endDate,
    },
  }
}

export const oneEightyDaysAgoExhibit = makeExhibit(-180)
export const oneSeventyNineDaysAgoExhibit = makeExhibit(-179)
export const previousExhibit = makeExhibit(-45, -1)
export const yesterdayExhibit = makeExhibit(-1, -1)
export const todayExhibit = {
  event: {
    // should be end of day so that when we look for current exhibits, endDate > now
    startDate: new Date(new Date().setHours(23, 59, 59, 998)),
    endDate: new Date(new Date().setHours(23, 59, 59, 999)),
  },
}
export const futureExhibit = makeExhibit(1, 3)
export const wayFutureExhibit = makeExhibit(100)
export const incompleteExhibit = {
  event: {
    startDate: new Date(),
    // no end date
  },
}
// Intentionally ordered funky to make sure sorting works
export const allTestExhibits = [
  futureExhibit,
  oneEightyDaysAgoExhibit,
  oneSeventyNineDaysAgoExhibit,
  todayExhibit,
  yesterdayExhibit,
  incompleteExhibit,
  wayFutureExhibit,
  previousExhibit,
]

export default allTestExhibits