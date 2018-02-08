const forward = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('hoursDisplay')
  event.editField('locationOverride').name('Event Location')
  event.editField('location').name('Service Point')

  // change places!
  event.moveField('libCalId').toTheTop()
  event.moveField('presenter').afterField('libCalId')
  event.moveField('title').afterField('presenter')
  event.moveField('slug').afterField('title')
  event.moveField('preferOnHomepage').afterField('slug')
  event.moveField('shortDescription').afterField('preferOnHomepage')
  event.moveField('startDate').afterField('shortDescription')
  event.moveField('endDate').afterField('startDate')
  event.moveField('timeOverride').afterField('endDate')
  event.moveField('locationOverride').afterField('timeOverride')
  event.moveField('content').afterField('locationOverride')
  event.moveField('sponsors').afterField('content')
  event.moveField('presenters').afterField('sponsors')
  event.moveField('representationalImage').afterField('presenters')
  event.moveField('registrationRequired').afterField('representationalImage')
  event.moveField('registrationUrl').afterField('registrationRequired')
  event.moveField('media').afterField('registrationUrl')
  event.moveField('contactPeople').afterField('media')
  event.moveField('location').afterField('contactPeople')
  event.moveField('relatedPages').afterField('location')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.createField('hoursDisplay')
  event.editField('locationOverride').name('Location Override')
  event.editField('location').name('Location')
}

module.exports = forward
