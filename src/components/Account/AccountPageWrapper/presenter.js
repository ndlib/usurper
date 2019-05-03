import React from 'react'
import PropTypes from 'prop-types'

import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import UserMenu from 'components/Layout/Navigation/UserMenu'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import InlineLoading from 'components/Messages/InlineLoading'

const AccountPageWrapper = (props) => {
  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='My Account' children={<UserMenu format='buttons' subheading={props.title} />} />
      <PageTitle title={props.title} hideInPage />
      <div className='row'>
        <div className='col-xs-12 col-md-8 col-sm-7'>
          { props.loading ? (
            <InlineLoading title='Loading login info' />
          ) : (
            <React.Fragment>
              <StaticAlert slug={props.slug} preview={props.preview} hideLoading />
              <div className={props.className}>{props.children}</div>
              <StaticBody slug={props.slug} preview={props.preview} hideLoading />
            </React.Fragment>
          )}
        </div>
        <StaticSidebar slug={props.slug} preview={props.preview} />
      </div>
    </div>
  )
}

AccountPageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  preview: PropTypes.bool,
  loading: PropTypes.bool,
}

export default AccountPageWrapper
