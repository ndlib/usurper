const forward = (migration) => {
  const resource = migration.editContentType('resource')

  resource.createField('access')
    .name('Access')
    .type('Symbol')

  resource.createField('includes')
    .name('Includes')
    .type('Text')

  resource.createField('platform')
    .name('Platform')
    .type('Symbol')

  resource.createField('publisher')
    .name('Publisher')
    .type('Symbol')

  resource.createField('provider')
    .name('Provider')
    .type('Symbol')

  resource.createField('urls')
    .name('Urls')
    .type('Object')
}

const reverse = (migration) => {
  const resource = migration.editContentType('resource')
  resource.deleteField('access')
  resource.deleteField('includes')
  resource.deleteField('platform')
  resource.deleteField('publisher')
  resource.deleteField('provider')
  resource.deleteField('urls')
}

module.exports = forward
