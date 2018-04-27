// allow floor map to be toggled on service points
const forward = (migration) => {
  const alertItems = {
      type: 'Link',
      linkType: 'Entry',
      validations: [
        { linkContentType: [ 'alert' ] },
      ],
    }

  const page = migration.editContentType('page')
  page.createField('alerts')
    .name('Alerts')
    .type('Array')
    .items(alertItems)
  page.deleteField('alert')

  const columnContainer = migration.editContentType('columnContainer')
  columnContainer.createField('alerts')
    .name('Alerts')
    .type('Array')
    .items(alertItems)
  columnContainer.deleteField('alert')

  const dynamicPage = migration.editContentType('dynamicPage')
  dynamicPage.createField('alerts')
    .name('Alerts')
    .type('Array')
    .items(alertItems)
  dynamicPage.deleteField('alert')
}

const reverse = (migration) => {
  const page = migration.editContentType('page')
  page.deleteField('alerts')
  page.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['alert'] }])

  const columnContainer = migration.editContentType('columnContainer')
  columnContainer.deleteField('alerts')
  columnContainer.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['alert'] }])

  const dynamicPage = migration.editContentType('dynamicPage')
  dynamicPage.deleteField('alerts')
  dynamicPage.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['alert'] }])
}

module.exports = forward
