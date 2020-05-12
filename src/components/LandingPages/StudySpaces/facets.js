const FEATURES = [
  'Quiet study',
  'Conversation allowed',
  'Reservable',
  'Open late',
  'Multimedia available',
  'Whiteboard access',
  'Individual study',
  'Group study',
].map(value => ({ // Facet expects key value pairs, but in this case the display value and key are the same
  key: value,
  value: value,
}))

export default [
  {
    label: 'Features',
    key: 'feature',
    fieldName: 'fields.features',
    options: FEATURES,
  },
]
