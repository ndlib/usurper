'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import LogOut from '../LogOut'
import StaticSidebar from '../Contentful/StaticContent/Sidebar'
import StaticBody from '../Contentful/StaticContent/Body'
import Dropdown from '../Dropdown'
import UpdateStatus from './settingsUpdateStatus'

const Presenter = (props) => {
  return (
    <div className='content'>
      <LogOut />

      <SearchProgramaticSet open={false} />
      <PageTitle title='Settings' />
      <div className='row'>
        <div className='col-md-8 col-sm-7 settings'>
          <p>
            Preferred Pickup Location:
          </p>
          <small>
            Used for ILL and DocDel
          </small>
          <Dropdown
            entries={props.homeLibraries}
            submit={(value, title) => props.setHomeLibrary(value)}
            deafultIndex={props.homeIndex}
            useButton={true}
          />
          <UpdateStatus status={props.libraryStatus} />
          <StaticBody slug='settings' preview={props.preview} />
        </div>
        <StaticSidebar slug='settings' preview={props.preview} />
      </div>
    </div>
  )
}

Presenter.propTypes = {
  preview: PropTypes.bool,
  homeLibraries: PropTypes.array.isRequired,
  setHomeLibrary: PropTypes.func.isRequired,
  homeIndex: PropTypes.number,
  libraryStatus: PropTypes.number,
}

export default Presenter
