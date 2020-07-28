// Presenter component for a Meeting and Event Space page from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import MeetingSpacesTable from './MeetingSpacesTable'
import 'static/css/global.css'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import LibMarkdown from 'components/LibMarkdown'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'

const RoomReservationsPresenter = ({ contactInfo, meetingSpacesData, preview, pathSlug, body }) => (
  <div>
    <PageTitle title='Reserve a Meeting or Event Space' />
    <SearchProgramaticSet open={false} />
    <StaticAlert slug={pathSlug} preview={preview} hideLoading />
    <div className='row'>
      <div className='col-xs-12 col-sm-10 col-md-8 col-lg-8'>
        <LibMarkdown slug={pathSlug} preview={preview}>{body[0]}</LibMarkdown>
        {body.length > 1 && (
          <React.Fragment>
            <MeetingSpacesTable meetingSpacesData={meetingSpacesData} contactInfo={contactInfo} />
            <LibMarkdown slug={pathSlug} preview={preview}>{body[1]}</LibMarkdown>
          </React.Fragment>
        )}
      </div>
      <StaticSidebar slug={pathSlug} preview={preview} />
    </div>
  </div>
)
RoomReservationsPresenter.propTypes = {
  meetingSpacesData: PropTypes.array.isRequired,
  preview: PropTypes.bool.isRequired,
  pathSlug: PropTypes.string.isRequired,
  body: PropTypes.array.isRequired,
  contactInfo: PropTypes.object,
}
export default RoomReservationsPresenter
