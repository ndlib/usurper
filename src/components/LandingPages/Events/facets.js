const AUDIENCE_OPTIONS = [
  'Undergraduates',
  'Graduate Students',
  'Faculty',
  'Staff',
  'Postdocs',
  'Public, Alumni, & Friends',
].map(value => ({ // Facet expects key value pairs, but in this case the display value and key are the same
  key: value,
  value: value,
}))

export const AUDIENCE_FACET = {
  label: 'Audience',
  key: 'audience',
  fieldName: 'audience',
  options: AUDIENCE_OPTIONS,
}

const TYPE_OPTIONS = [
  'Discussion',
  'Exhibit',
  'Hands-On Lab',
  'Lecture/Seminar',
  'Research/Writing Camp',
  'Workshop',
  'Study Break',
  'Special Event',
].map(value => ({
  key: value,
  value: value,
}))

export const TYPE_FACET = {
  label: 'Event',
  key: 'type',
  fieldName: 'type',
  options: TYPE_OPTIONS,
}

export default [
  AUDIENCE_FACET,
  TYPE_FACET,
]
