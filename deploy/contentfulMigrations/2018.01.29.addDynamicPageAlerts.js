const forward = (migration) => {
  const dynamicPage = migration.editContentType('dynamicPage')

  dynamicPage.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([
      { linkContentType: [ 'alert' ] },
    ])

  const container = migration.editContentType('columnContainer')

  container.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([
      { linkContentType: [ 'alert' ] },
    ])
}

const reverse = (migration) => {
  migration.editContentType('dynamicPage').deleteField('alert')
  migration.editContentType('columnContainer').deleteField('alert')
}

module.exports = forward
