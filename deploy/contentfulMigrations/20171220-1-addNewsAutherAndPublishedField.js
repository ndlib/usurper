const forward = (migration) => {
  const news = migration.editContentType('news')
  // currently does not add the appearance aspects for the date.
  // This needs to select the date only format.
  news.createField('publishedDate')
    .type('Date')
    .name('Published Date')

  // migrate the display start to the published date.
  migration.transformEntries({
    contentType: 'news',
    from: ['displayStartDate'],
    to: ['publishedDate'],
    shouldPublish: true,
    transformEntryForLocale: function (fromFields, currentLocale) {
      return { publishedDate: fromFields.displayStartDate[currentLocale] }
    },
  })

  news.createField('author')
    .type('Symbol')
    .name('Author')
}

const reverse = (migration) => {
  const news = migration.editContentType('news')
  news.deleteField('author')
  news.deleteField('publishedDate')
}

module.exports = forward
