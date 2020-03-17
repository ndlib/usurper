/* eslint complexity: ["warn", 10] */
import typy from 'typy'
import * as statuses from 'constants/APIStatuses'

export const dayOrder = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
export const hesburghHoursCode = '426'
export const hoursPageSlug = 'hours'
export const hoursPageOrder = [
  { servicePointSlug: 'hesburghlibrary', main: true },
  { servicePointSlug: 'askusdesk', main: false },
  { servicePointSlug: 'circulationservicedesk', main: false },
  { servicePointSlug: 'course-reserves-office', main: false },
  { servicePointSlug: 'ill-office', main: false },
  { servicePointSlug: 'mediacorps', main: false },
  { servicePointSlug: 'oitoutpost', main: false },
  { servicePointSlug: 'reservesmicrotextandmediadesk', main: false },
  { servicePointSlug: 'architecturelibrary', main: true },
  { servicePointSlug: 'mahaffeybusinesslibrary', main: true },
  { servicePointSlug: 'centerfordigitalscholarship', main: true },
  { servicePointSlug: 'chemistryphysicslibrary', main: true },
  { servicePointSlug: 'engineeringlibrary', main: true },
  { servicePointSlug: 'kelloggkroclibrary', main: true },
  { servicePointSlug: 'omearamathematicslibrary', main:true },
  { servicePointSlug: 'medievalinstitutelibrary', main: true },
  { servicePointSlug: 'byzantinestudiesreadingroom', main: false },
  { servicePointSlug: 'musiclibrary', main: true },
  { servicePointSlug: 'radiationchemistryreadingroom', main: true },
  { servicePointSlug: 'rarebooksspecialcollections', main: true },
  { servicePointSlug: 'universityarchives', main: true },
  { servicePointSlug: 'visualresourcescenter', main: true },
]

export const hoursOpenStatus = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  PARTIALLY_OPEN: 'PARTIALLY_OPEN',
}

export const getOpenStatus = (hoursEntry) => {
  if (typy(hoursEntry, 'status').safeString !== statuses.SUCCESS) {
    return hoursOpenStatus.CLOSED
  }
  switch (typy(hoursEntry, 'today.times.status').safeString) {
    case 'closed':
      return hoursOpenStatus.CLOSED
    case '24hours':
      return hoursOpenStatus.OPEN
    case 'text':
      const partiallyOpenKeywords = [
        'card swipe',
        'card access',
        'swipe access',
        'limited access',
        'partially open',
      ]
      return partiallyOpenKeywords.some(phrase => typy(hoursEntry, 'today.times.text').safeString.toLowerCase().indexOf(phrase) >= 0)
        ? hoursOpenStatus.PARTIALLY_OPEN
        : hoursOpenStatus.CLOSED
    default:
      const currentOpenBlocks = typy(hoursEntry, 'today.times.hours').safeArray.filter(hoursBlock => {
        const now = new Date()
        return (new Date(hoursBlock.fromLocalDate) <= now && now <= new Date(hoursBlock.toLocalDate))
      })
      return (currentOpenBlocks.length > 0) ? hoursOpenStatus.OPEN : hoursOpenStatus.CLOSED
  }
}
