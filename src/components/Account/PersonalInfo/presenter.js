import React from 'react'
import PropTypes from 'prop-types'
import LoanResources from '../LoanResources'
import PageTitle from 'components/Layout/PageTitle'
import Loading from 'components/Messages/Loading'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticBody from 'components/Contentful/StaticContent/Body'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import Link from 'components/Interactive/Link'
import UserMenu from 'components/Layout/Navigation/UserMenu'

const LoggedIn = (preview, balance) => {
  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Items &amp; Requests' />} />
      <PageTitle title='Items &amp; Requests' hideInPage />

      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <StaticAlert slug='personal' preview={preview} />
          {
            balance &&
            <div className='alert page lowPri'>
              <div className='width'>
                Your account balance is { balance }.
                Please contact our <Link to='mailto:circ@nd.edu?subject=Billing'>circulation desk</Link> with questions.
              </div>
            </div>
          }
          <LoanResources />
          <StaticBody slug='personal' preview={preview} />
        </div>
        <StaticSidebar slug='personal' preview={preview} />
      </div>
    </div>
  )
}

const Presenter = (props) => {
  if (props.loggedIn) {
    return LoggedIn(props.preview, props.balance)
  } else if (props.redirectUrl) {
    window.location = props.redirectUrl
  } else {
    return <Loading message='Loading Your Account' />
  }
}

Presenter.propTypes = {
  loggedIn: PropTypes.bool,
  preview: PropTypes.bool,
  redirectUrl: PropTypes.string,
  balance: PropTypes.string,
}

export default Presenter