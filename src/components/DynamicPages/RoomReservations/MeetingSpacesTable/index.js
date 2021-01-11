import React from 'react'
import Table from 'components/Table'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import ModalImage from 'components/Contentful/ModalImage'
import typy from 'typy'
import './style.css'

const MeetingSpacesTable = (props) => {
  const tableData = props.meetingSpacesData.map(data => {
    const contactData = typy(props.contactInfo, 'contacts').safeArray.find(contact => {
      return contact.netID === data.fields.contact
    })
    return {
      ...data,
      features: (
        (!data.fields.additionalFeatures) ? null
          : <React.Fragment>
            <ul>
              <li>{data.fields.capacity}</li>
              {data.fields.additionalFeatures.map(feature => {
                return <li key={feature}>{feature}</li>
              })}
            </ul>
          </React.Fragment>
      ),
      image: (
        (!data.fields.photo) ? null
          : <ModalImage photo={data.fields.photo} title={data.fields.title} altText={data.fields.photo.fields.description} />
      ),
      space: (
        <React.Fragment>
          <h3 className='meetingSpacesHeader'>{data.fields.title}</h3>
          <Link to={`/floor/${data.fields.floor.fields.slug}`}>{data.fields.floor.fields.title} {data.fields.cardinalDirection}</Link>
        </React.Fragment>
      ),
      contact: (
        (!data.fields.contact) ? null
          : <Link to={`mailto:${contactData.email}`}>{contactData.name}</Link>
      ),
    }
  })

  const columns = [
    { path: 'space', label: 'Space', width: '25%', mobileLabel: '' },
    { path: 'image', label: 'Image', width: '25%', mobileLabel: '' },
    { path: 'features', label: 'Features', width: '25%', mobileLabel: 'Features' },
    { path: 'contact', label: 'Contact', width: '25%', mobileLabel: 'Contact' },
  ]
  return (
    <Table columns={columns} data={tableData} className='meetingSpacesTable' />
  )
}
export default (MeetingSpacesTable)

MeetingSpacesTable.propTypes = {
  meetingSpacesData: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      contact: PropTypes.string,
      photo: PropTypes.object,
      additionalFeatures: PropTypes.array,
      floor: PropTypes.object.isRequired,
      cardinalDirection: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
  contactInfo: PropTypes.shape({
    contacts: PropTypes.arrayOf(PropTypes.shape({
      netID: PropTypes.string.isRequired,
    })),
  }),
}
