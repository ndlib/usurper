import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'

const Contact = (props) => {
  if (!props.servicePoint) {
    return null
  }

  const sp = props.servicePoint.fields

  let floor
  let building
  if (sp.floor && sp.floor.fields) {
    const rawFloor = sp.floor.fields
    if (rawFloor.image && !sp.hideFloorMap) {
      const floorLink = 'floor/' + rawFloor.slug
      floor = (
        <li className='floor'><Link
          to={floorLink}
          title={'Link to floor map of ' + rawFloor.title}
        >
          Floor Map
        </Link></li>
      )
    }

    if (rawFloor.building && rawFloor.building.fields) {
      const rawBuilding = rawFloor.building.fields
      building = (
        <li
          className='building'>
          <Link
            to={rawBuilding.mapLink}
            title={'Link to map to ' + rawBuilding.title}
            className='map'
            itemProp='hasMap'
          >
            Campus Map
          </Link>
        </li>
      )
    }
  }

  let phone
  if (sp.phoneNumber) {
    phone = (
      <li className='phone'>
        <a
          title={'Call ' + sp.phoneNumber}
          href={'tel:+' + sp.phoneNumber.replace(/[() -.]/g, '')}
          itemProp='telephone'
        >
          {sp.phoneNumber}
        </a>
      </li>
    )
  }

  let fax
  if (sp.faxNumber) {
    fax = (
      <li
        className='fax'
        title={'Fax: ' + sp.faxNumber}
        itemProp='faxNumber'
      >
        {sp.faxNumber}
      </li>
    )
  }

  let email
  if (sp.email) {
    email = (
      <li className='email'>
        <a
          title={'Email ' + sp.email}
          href={'mailto:' + sp.email}
          itemProp='email'
        >
          {sp.email}
        </a>
      </li>
    )
  }

  let accessNote
  if (sp.accessNote) {
    // this is hidden in css on the contact page
    accessNote = <LibMarkdown className='access-note'>{ sp.accessNote }</LibMarkdown>
  }

  // this is hidden in css everywhere except the contact page
  let webPage
  if (sp.relatedWebPage) {
    if (sp.relatedWebPage.circular && typy(sp.relatedWebPage, 'sys.id').safeString === typy(props.page, 'sys.id').safeString) {
      sp.relatedWebPage.fields = props.page.fields
    }
    if (sp.relatedWebPage.fields) {
      const link = sp.relatedWebPage.fields.slug ? sp.relatedWebPage.fields.slug : sp.relatedWebPage.fields.url
      webPage = (
        <li className='web'>
          <Link to={link} itemProp='url'>
            Web Page
          </Link>
        </li>
      )
    }
  }

  const fullDisplay = (
    <div className='point'>
      {accessNote}
      <ul>
        {phone}
        {email}
        {building}
        {floor}
        {webPage}
        {fax}
      </ul>
    </div>
  )
  const limitedDisplay = (
    <div className='point'>
      {accessNote}
      <ul>
        {building}
        {floor}
      </ul>
    </div>
  )
  return (
    <div>
      { props.showDetails ? fullDisplay : limitedDisplay }
    </div>
  )
}

Contact.propTypes = {
  servicePoint: PropTypes.object,
  showDetails: PropTypes.bool,
  page: PropTypes.shape({
    fields: PropTypes.object,
  }),
}

Contact.defaultProps = {
  showDetails: true,
}

export default Contact
