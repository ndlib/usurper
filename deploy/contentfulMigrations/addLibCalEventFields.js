const forward = (migration) => {
  const event = migration.editContentType('event')
  event.createField('location')
    .type('Link')
    .name('Location')
    .linkType('Entry')
    .validations([
      { linkContentType: ['servicePoint'] },
    ])

  event.createField('presenter')
    .type('Symbol')
    .name('Presenter(s)')

  event.createField('libCalId')
    .type('Symbol')
    .name('LibCal Id')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('location')
  event.deleteField('presenter')
  event.deleteField('libCalId')
}

module.exports = forward
