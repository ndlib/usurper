const forward = (migration) => {
  const dynamicPage = migration.editContentType('dynamicPage')

  dynamicPage.createField('servicePoints')
    .name('Service Points')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{
        linkContentType: ['servicePoint'],
      }],
      linkType: 'Entry',
    })
}

const reverse = (migration) => {
  const dynamicPage = migration.editContentType('dynamicPage')
  dynamicPage.deleteField('servicePoints')
}

module.exports = forward
