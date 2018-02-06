const forward = (migration) => {
  const event = migration.editContentType('event')
  event.createField('sponsors')
    .type('Text')
    .name('Sponsors')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('sponsors')
}

module.exports = forward
