const forward = (migration) => {
  const resource = migration.editContentType('resource')

  resource.createField('purls')
    .name('PURL(s)')
    .type('Object')
}

const reverse = (migration) => {
  const resource = migration.editContentType('resource')
  resource.deleteField('purls')
}

module.exports = forward
