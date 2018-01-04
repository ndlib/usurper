// this migration should be run before the deployment
const forward = (migration) => {
  migration.transformEntries({
    contentType: 'news',
    from: ['displayStartDate'],
    to: ['publishedDate'],
    shouldPublish: true,
    transformEntryForLocale: function (fromFields, currentLocale) {
      if (fromFields.displayStartDate) {
        return { publishedDate: fromFields.displayStartDate[currentLocale] }
      }
    },
  })
}

module.exports = forward
