const forward = (migration) => {

  // MEDIA type
  const media = migration.createContentType('media')
    .name('Media')
    .displayField('title')

  media.createField('title')
    .type('Symbol')
    .name('Title')

  media.createField('type')
  .type('Symbol')
  .name('Type')
  .validations([
    { in: ['image','pdf','video']
    }
  ])

  media.createField('url')
  .type('Symbol')
  .name('URL')

  // EVENT field update
  const eventType = migration.editContentType('event')
    .createField('media')
    .name('Media')
    .type('Array')
    .items({
      type: 'Link',
      validations: [{
        linkContentType: ['media'],
      }],
      linkType: 'Entry',
    })
}

const reverse = (migration) => {
  migration.editContentType('event').deleteField('media')
  migration.deleteContentType('media')
}

module.exports = forward
