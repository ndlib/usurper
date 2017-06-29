import React from 'react'
import LandingPage from '../index.js'
import Link from '../../Link'

const Research = () => {
  return (

    <LandingPage title='Research'>

      <h1>All Research</h1>
      <hr />
      <div className='row'>
        <div className='col-md-6 col-xs-12'>

          <h3>Research Support</h3>
          <p>
            <Link to='/databases/a'>Browse A-Z</Link><br />
            <span>Browse an alphabetical</span>

          </p>
          <p>
            <Link to='/subjects/'>Browse by Subject</Link><br />
            <span>Browse databases organized by Subject</span>

          </p>
          <p>
            <Link to='/electronic-resource-trials/'>ER Trials</Link><br />
            <span>Current trials for databases or other electronic content lives here</span>
          </p>
          <p>
            <Link to='/subject-librarians/'>Subject Librarians</Link>
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
            <Link to='/citation-management/'>Citation Management</Link><br />
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

          <p><Link to='/medieval'>Medieval Institute Library</Link></p>

          <p><Link to='http://rarebooks.library.nd.edu/'>Rare Books and Special Collections</Link></p>

          <p><Link to='http://collections.library.nd.edu'>Digital Exhibits and Collections</Link></p>

          <p><Link to='http://curate.nd.edu'>CurateND</Link></p>

          <p><Link to='http://archives.nd.edu/findaids/ead/xml/'>Archives Collections</Link></p>

          <p><Link to='http://rarebooks.library.nd.edu/exhibits/index.shtml'>Exhibits</Link></p>
        </div>

      </div>

    </LandingPage>
  )
}

export default Research
