const forward = (migration) => {
  const event = migration.editContentType('event')
  event.createField('location')
    .type('Link')
    .name('Location')
    .linkType('Entry')
    .validations([
      { linkContentType: ['servicePoint'] },
    ])

  event.createField('contactPeople')
    .type('Symbol')
    .name('Contact People')

  event.createField('presenter')
    .type('Symbol')
    .name('Presenter(s) from libcal')

  event.createField('libCalId')
    .type('Symbol')
    .name('LibCal Id')
  event.moveField('libCalId')
    .toTheTop()

  event.createField('hoursDisplay')
    .type('Symbol')
    .name('Hours To Display')
  event.moveField('hoursDisplay')
    .afterField('endDate')
}

const reverse = (migration) => {
  const event = migration.editContentType('event')
  event.deleteField('location')
  event.deleteField('contactPeople')
  event.deleteField('presenter')
  event.deleteField('libCalId')
  event.deleteField('hoursDisplay')
}

module.exports = forward
