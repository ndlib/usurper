const forward = (migration) => {
  const alert = migration.editContentType('alert')

  alert.createField('type')
    .name('Type')
    .type('Symbol')
    .validations([
      { in: ['Informational', 'Warning'] },
    ])
    .required(true)

  alert.moveField('type').beforeField('global')
}

const reverse = (migration) => {
  migration.editContentType('alert').deleteField('type')
}

module.exports = forward
