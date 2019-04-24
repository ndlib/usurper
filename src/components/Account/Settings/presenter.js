import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticBody from 'components/Contentful/StaticContent/Body'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import CircOptIn from './CircOptIn'
// import PickUp from './PickUp'
import UserMenu from 'components/Layout/Navigation/UserMenu'

const Presenter = (props) => {
  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Settings' />} />
      <PageTitle title='Settings' hideInPage />

      <div className='row'>
        <div className='col-md-8 col-sm-7 settings'>
          <StaticAlert slug='settings' preview={props.preview} />
          {
            /* Per Lauren: Delivery locations not in place yet.
            <PickUp
              entries={props.homeLibraries}
              setHomeLibrary={props.setHomeLibrary}
              defaultIndex={props.homeIndex}
              libraryStatus={props.libraryStatus}
            />
            */
          }
          <CircOptIn
            setCircStatus={props.setCircStatus}
            getCircStatus={props.getCircStatus}
          />
          <StaticBody slug='settings' preview={props.preview} />
        </div>
        <StaticSidebar slug='settings' preview={props.preview} />
      </div>
    </div>
  )
}

Presenter.propTypes = {
  preview: PropTypes.bool,
  // homeLibraries: PropTypes.array.isRequired,
  // setHomeLibrary: PropTypes.func.isRequired,
  // homeIndex: PropTypes.number,
  // libraryStatus: PropTypes.number,
  setCircStatus: PropTypes.func.isRequired,
  getCircStatus: PropTypes.func.isRequired,
}

export default Presenter
