const forward = (migration) => {
  const dynamicPage = migration.editContentType('dynamicPage')

  dynamicPage.createField('alert')
    .name('Alert')
    .type('Link')
    .linkType('Entry')
    .validations([
      { linkContentType: [ 'alert' ] },
    ])
}

const reverse = (migration) => {
  migration.editContentType('dynamicPage').deleteField('alert')
}

module.exports = forward
