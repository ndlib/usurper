import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../Link'

const Contact = (props) => {
  if (!props.servicePoint) {
    return null
  }

  let sp = props.servicePoint.fields

  let floor
  let building
  if (sp.floor) {
    let rawFloor = sp.floor.fields
    floor = <Link to={'floor/' + rawFloor.slug}>{rawFloor.title}<br /></Link>

    if (rawFloor.building) {
      let rawBuilding = rawFloor.building.fields
      building = <Link to={rawBuilding.mapLink}>{rawBuilding.title}<br /></Link>
    }
  }

  let addr1
  if (sp.address) {
    addr1 = <span>{sp.address}<br /></span>
  }

  let addr2
  if (sp.city || sp.state || sp.zipcode) {
    let str = sp.city ? sp.city : ''
    str += sp.state ? ', ' + sp.state : ''
    str += sp.zipcode ? ' ' + sp.zipcode : ''
    addr2 = <span>{str}</span>
  }

  return (
    <div className='contact'>
      <address>
        {building}
        {floor}
        {addr1}
        {addr2}
      </address>
    </div>
  )
}

Contact.propTypes = {
  servicePoint: PropTypes.object,
}

export default Contact
