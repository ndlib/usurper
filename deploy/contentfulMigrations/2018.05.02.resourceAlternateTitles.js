const forward = (migration) => {
  const resource = migration.editContentType('resource')
  resource.createField('alternateTitles')
    .name('Alternate Title(s)')
    .type('Array')
    .items({
      type: 'Symbol',
      validations: [],
    })

  resource.moveField('alternateTitles').afterField('title')

  resource.changeEditorInterface('alternateTitles', 'tagEditor')
}

const reverse = (migration) => {
  const resource = migration.editContentType('resource')
  resource.deleteField('alternateTitles')
}

module.exports = forward
