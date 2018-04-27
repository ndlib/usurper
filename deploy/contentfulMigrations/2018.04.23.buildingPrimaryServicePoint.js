// add primary service point to buildings
const forward = (migration) => {
  const building = migration.editContentType('building')

  building.createField('primaryServicePoint')
    .name('Primary Service Point')
    .type('Link')
    .linkType('Entry')
    .validations([{ linkContentType: ['servicePoint'] }])

  building.moveField('primaryServicePoint').afterField('title')
}

const reverse = (migration) => {
  const building = migration.editContentType('building')

  building.deleteField('primaryServicePoint')
}

module.exports = forward
