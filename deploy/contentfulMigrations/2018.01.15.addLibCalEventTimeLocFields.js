const forward = (migration) => {
  const event = migration.editContentType('event')
  event.createField('locationOverride')
    .type('Symbol')
    .name('Location Override')

    event.createField('dateOverride')
    .type('Symbol')
    .name('Date Override')

    event.createField('timeOverride')
    .type('Symbol')
    .name('Time Override')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('dateOverride')
  event.deleteField('locationOverride')
  event.deleteField('timeOverride')
}

module.exports = forward
