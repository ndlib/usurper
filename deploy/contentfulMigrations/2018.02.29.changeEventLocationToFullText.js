// this migration should be run before the deployment
const forward = (migration) => {
  const event = migration.editContentType('event')

  event.createField('locationText')
    .name('Event Location')
    .type('Text')

  event.moveField('locationText').afterField('timeOverride')

  migration.transformEntries({
    contentType: 'event',
    from: ['locationOverride'],
    to: ['locationText'],
    shouldPublish: true,
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (fromFields.locationOverride) {
        return { locationText: fromFields.locationOverride[currentLocale] }
      }
    },
  })
}

const forward2 = (migration) => {
  const event = migration.editContentType('event')

  event.deleteField('locationOverride')
}

const reverse1 = (migration) => {
  const event = migration.editContentType('event')

  event.deleteField('locationText')
}

const reverse2 = (migration) => {
  const event = migration.editContentType('event')

  event.createField('locationOverride')
    .name('Event Location')
    .type('Symbol')

  event.moveField('locationOverride').afterField('timeOverride')

  migration.transformEntries({
    contentType: 'event',
    from: ['locationText'],
    to: ['locationOverride'],
    shouldPublish: true,
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (fromFields.locationText) {
        return { locationOverride: fromFields.locationText[currentLocale] }
      }
    },
  })
}

module.exports = forward
