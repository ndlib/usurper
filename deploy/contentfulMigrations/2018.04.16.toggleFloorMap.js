// allow floor map to be toggled on service points
const forward = (migration) => {
  const servicePoint = migration.editContentType('servicePoint')

  servicePoint.createField('hideFloorMap')
    .name('Hide Floor Map')
    .type('Boolean')

  servicePoint.moveField('hideFloorMap').afterField('floor')
}

const reverse = (migration) => {
  const servicePoint = migration.editContentType('servicePoint')

  servicePoint.deleteField('hideFloorMap')
}

module.exports = forward
