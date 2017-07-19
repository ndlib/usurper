import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'

const Contact = (props) => {
  if (!props.servicePoint) {
    return null
  }

  let sp = props.servicePoint.fields

  let floor
  let building
  if (sp.floor) {
    let rawFloor = sp.floor.fields
    if (rawFloor.image) {
      let floorLink = 'floor/' + rawFloor.slug
      floor = (
        <li className='floor'><Link
          to={floorLink}
          title={'Link to floor map of ' + rawFloor.title}
        >
          Floor Map
        </Link></li>
      )
    }

    if (rawFloor.building) {
      let rawBuilding = rawFloor.building.fields
      building = (
        <li className='building'><Link
          to={rawBuilding.mapLink}
          title={'Link to map to ' + rawBuilding.title}
          className='map'
        >Campus Map</Link></li>
      )
    }
  }
  
  let phone
  if (sp.phoneNumber) {
    phone = <li className='phone'><a title={'Call ' + sp.phoneNumber} href={'tel:+' + sp.phoneNumber.replace(/[() -.]/g, '')}>{sp.phoneNumber}</a></li>
  }

  let email
  if (sp.email) {
    email = <li className='email'><a title={'Email ' + sp.email} href={'mailto:+' + sp.email }>{sp.email}</a></li>
  }

  let accessNote
  if (sp.accessNote) {
    accessNote = <LibMarkdown>{ sp.accessNote }</LibMarkdown>
  }

  return (
    <div className='point'>
      {accessNote}
      <ul>
        {building}
        {floor}
        {phone}
        {email}
      </ul>
    </div>
  )
}

Contact.propTypes = {
  servicePoint: PropTypes.object,
}

export default Contact
