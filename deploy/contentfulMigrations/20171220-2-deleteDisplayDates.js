// this migration should be run after the deployment
const forward = (migration) => {
  const news = migration.editContentType('news')

  news.deleteField('displayStartDate')
  news.deleteField('displayEndDate')
  // migrate the display start to the published date.
}

const reverse = (migration) => {
  const news = migration.editContentType('news')

  news.createField('displayStartDate')
    .type('Date')
    .name('Display Start Date')

  // migrate the publishe date to display start
  migration.transformEntries({
    contentType: 'news',
    from: ['publishedDate'],
    to: ['displayStartDate'],
    shouldPublish: true,
    transformEntryForLocale: function (fromFields, currentLocale) {
      return { displayStartDate: fromFields.publishedDate[currentLocale] }
    },
  })

  news.createField('displayEndDate')
    .type('Date')
    .name('Display End Date')
}

module.exports = reverse
