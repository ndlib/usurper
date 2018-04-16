// allow news to be preferred on the homepage
const forward = (migration) => {
  const news = migration.editContentType('news')

  news.createField('preferOnHomepage')
    .name('Prefer on Homepage')
    .type('Boolean')

  news.moveField('preferOnHomepage').afterField('slug')
}

const reverse = (migration) => {
  const news = migration.editContentType('news')

  news.deleteField('preferOnHomepage')
}

module.exports = forward
