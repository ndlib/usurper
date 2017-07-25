import React from 'react'
import LandingPage from '../index.js'
import Link from '../../Link'

const Research = () => {
  return (

    <LandingPage title='Research'>

      <div className='row research-landing'>
        <div className='col-md-6 col-xs-12'>

          <h3>Research Support</h3>
          <p>
            <Link to='/databases/a'>Databases A-Z</Link><br />
            <span>Browse an alphabetical list of databases and online resources</span>

          </p>
          <p>
            <Link to='/subjects/'>Subjects A-Z</Link><br />
            <span>Browse an alphabetical list of subjects</span>

          </p>
          <p>
            <Link to='/electronic-resource-trials/'>ER Trials</Link><br />
            <span>Current trials for databases or other electronic content</span>
          </p>
          <p>

            <Link to='https://directory.library.nd.edu/directory/subjects' noTarget={true}>Subject Librarians and Specialists</Link>
          </p>
          <p>
            <Link to='http://libguides.library.nd.edu/first-year-studies'>Starting Your Research</Link><br />
            <span>Guide for first year students to help starting research.</span>
          </p>
          <p>
            <Link to='http://libguides.library.nd.edu'>Research Guides</Link><br />
            <span>Guides, by subject area, to help pilot your research</span>
          </p>
          <p>
            <Link to='https://dmptool.org/'>DMP Tool</Link><br />
            <span>Resources to help write a data management plan for your research</span>

          </p>
          <p>
            <Link to='/copyright/'>Copyright</Link><br />
            <span>Guide providing advice on copyright laws and policies</span>

          </p>
          <p>
            <Link to='http://libguides.library.nd.edu/citemanage/home'>Citation Management</Link><br />
            <span>Tools to help with your citation management</span>

          </p>
          <p>
            <Link to='http://libguides.library.nd.edu/datamanagement'>Data Management</Link><br />
            <span>Guidance on how Hesburgh Libraries can help support your research data</span>

          </p>
          <p>
            <Link to='/osf'>Open Science Framework</Link><br />
            <span>Helps researchers collaborate and make their work accessible</span>

          </p>

        </div>

        <div className='col-md-6 col-xs-12'>
          <h3>Unique Collections</h3>

          <p><Link to='http://rarebooks.library.nd.edu/'>Rare Books &amp; Special Collections</Link></p>

          <p><Link to='http://archives.nd.edu/findaids/ead/xml/'>University Archives</Link></p>

          <p><Link to='/medieval'>Medieval Institute Library</Link></p>

          <p><Link to='http://rarebooks.library.nd.edu/exhibits/index.shtml'>Library Exhibits</Link></p>

          <p><Link to='http://collections.library.nd.edu'>Digital Exhibits and Collections</Link></p>

          <p><Link to='http://curate.nd.edu'>CurateND</Link></p>

          <h3>Search Tools</h3>

          <p><Link to='http://onesearch.library.nd.edu/utilities/search/ndu/onesearch'>OneSearch</Link></p>

          <p><Link to='http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Basic&onCampus=false&pcAvailabiltyMode=true&query=&search_scope=nd_campus&tab=nd_campus&vid=NDU&displayField=title&displayField=creator'>ND Catalog</Link></p>

          <p><Link to='https://ejl.library.nd.edu/'>EJournal Locator</Link></p>

          <p><Link to='https://xerxes.library.nd.edu/quicksearch/databases/subject/general-multidisciplinary'>Article QuickSearch</Link></p>

        </div>

      </div>

    </LandingPage>
  )
}

export default Research
