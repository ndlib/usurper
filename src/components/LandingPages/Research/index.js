import React from 'react'
import LandingPage from '../index.js'
import Link from '../../Link'

const Research = () => {
  return (

    <LandingPage title='Research' className='content'>

      <h1>All Research</h1>
      <hr />
      <div className='row'>
        <div className='col-md-4 col-xs-12'>
          <h3><Link to='/subject-librarians/'>Subject Librarians</Link></h3>
          <p>&nbsp;</p>
          <h3>Research Support</h3>
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
            <Link to='http://libguides.library.nd.edu/c.php?g=277306&amp;p=1849931'>Data Management</Link><br />
            <span>Guidance on how Hesburgh Libraries can help support your research data</span>

          </p>
          <p>
            <Link to='/osf/'>Open Science Framework</Link><br />
            <span>Helps researchers collaborate and make their work accessible</span>

          </p>

        </div>

        <div className='col-md-4 col-md-offset-1 col-xs-12'>
          <h3>Databases</h3>
          <p>
            <Link to='/databases/a'>Browse A-Z</Link><br />
            <span>Browse an alphabetical</span>

          </p>
          <p>
            <Link to='/database-subject/'>Browse by Subject</Link><br />
            <span>Browse databases organized by Subject</span>

          </p>
          <p>
            <Link to='/electronic-resource-trials/'>ER Trials</Link><br />
            <span>Current trials for databases or other electronic content lives here</span>
          </p>
          <p>&nbsp;</p>

          <h3>Collections</h3>

          <p><Link to='/medieval-institute-library/'>Medieval Institute Library</Link></p>

          <p><Link to='http://rarebooks.library.nd.edu/'>Rare Books and Special Collections</Link></p>

          <p><Link to='/dec/'>Digital Exhibits and Collections</Link></p>

          <p><Link to='/curate-nd/'>CurateND</Link></p>

          <p><Link to='/Linkrchives-collections/'>Archives Collections</Link></p>

          <p><Link to='/exhibits/'>Exhibits</Link></p>

        </div>

      </div>

    </LandingPage>
  )
}

export default Research
