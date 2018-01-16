const forward = (migration) => {
  const event = migration.editContentType('event')
  event.createField('locationOverride')
    .type('Symbol')
    .name('Location Override')

    event.createField('timeOverride')
    .type('Text')
    .name('Time Override')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('locationOverride')
  event.deleteField('timeOverride')
}

module.exports = forward
