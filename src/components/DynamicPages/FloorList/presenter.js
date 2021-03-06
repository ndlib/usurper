// Presenter component for a displaying Floors List table
import React from 'react'
import PropTypes from 'prop-types'
import FloorsTable from './FloorsTable'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticAlert from 'components/Contentful/StaticContent/Alert'

const FloorsPresenter = ({ floorData, pathSlug, preview, title }) => (
  <div className='container-fluid floorplan'>
    <PageTitle title={title} />
    <SearchProgramaticSet open={false} />
    <StaticAlert slug={pathSlug} preview={preview} hideLoading />
    <div className='row'>
      <div className='col-md-8 col-sm-7 col-xs-12'>
        <FloorsTable floorData={floorData} />
      </div>
      <StaticSidebar slug={pathSlug} preview={preview} />
    </div>
  </div>
)
export default FloorsPresenter

FloorsPresenter.propTypes = {
  floorData: PropTypes.array.isRequired,
  pathSlug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  preview: PropTypes.bool.isRequired,
}
