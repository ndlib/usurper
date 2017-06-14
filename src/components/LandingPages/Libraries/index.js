import React from 'react'
import Link from '../../Link'
import PageTitle from '../../PageTitle'

const Libraries = () => {
  return (
    <div>
      <h2>All Libraries and Centers</h2>
      <hr />
      <p>Lucas ipsum dolor sit amet wesell hutt naberrie airen pellaeon wookiee rahm nagai breha wessell. Gorax aayla thakwaash spar winter aramandi saffa. Ryn moff sluis sio thrackan mccool pellaeon mon vao. Wilhuff monkey-lizard yuvernian fortuna orus feeorin ailyn kit sidious. Dexter nadon rebo coruscant. </p>

      <div className='row'>
        <div className='col-md-4 col-xs-12'>

          <h3><Link to='/hesburgh-libraries/'>Hesburgh Libraries</Link></h3>
          <ul className='child'>

            <li><Link to='/architecture/'>Architecture Library</Link></li>

            <li><Link to='/business/'>Business Library</Link></li>

            <li><Link to='http://library.nd.edu/cds/'>Center for Digital Scholarship</Link></li>

            <li><Link to='/chemistry/'>Chemistry/Physics Library</Link></li>

            <li><Link to='/engineering/'>Engineering Library</Link></li>

            <li><Link to='/kellogg-kroc/'>Kellogg/Kroc Library</Link></li>

            <li><Link to='/mathematics/'>Mathematics Library</Link></li>

            <li><Link to='/medieval/'>Medieval Institute Library</Link></li>

            <li><Link to='/preservation/'>Preservation</Link></li>

            <li><Link to='http://rarebooks.library.nd.edu/'>Rare Books and Special Collections</Link></li>

            <li><Link to='http://archives.nd.edu/'>University Archives</Link></li>

            <li><Link to='/visual-resources-center/'>Visual Resources Center</Link></li>

          </ul>

        </div>
        <div className='col-md-4 col-md-offset-1 col-xs-12'>

          <h3><Link to='/global-gateways/'>Global Gateways</Link></h3>
          <ul className='child'>

            <li><Link to='/jerusalem-global-gateway/'>Tantur</Link></li>

            <li><Link to='/london-global-gateway/'>London</Link></li>

            <li><Link to='/rome-global-gateway/'>Rome</Link></li>

          </ul>

          <p>&nbsp;</p>

          <h3><Link to='/area-libraries/'>Area Libraries</Link></h3>
          <ul className='child'>

            <li><Link to='http://sjcpl.lib.in.us/'>St. Joseph County Public Library</Link></li>

            <li><Link to='https://www.bethelcollege.edu/library/'>Bethel College Bowen Library</Link></li>

            <li><Link to='https://www.saintmarys.edu/library/'>Saint Mary's College Cushwa-Leighton Library</Link></li>

            <li><Link to='http://www.hcc-nd.edu/mckenna-library/'>Holy Cross College McKenna Library</Link></li>

            <li><Link to='https://www.iusb.edu/library/'>Indiana University South Bend</Link></li>

            <li><Link to='http://law.nd.edu/library/'>Kresge Law Library</Link></li>

            <li><Link to='http://latinostudies.nd.edu/library-archives/'>Institute for Latino Studies Julian Samora Library</Link></li>
          </ul>
        </div>
      </div>
      <PageTitle title='Libraries' />
    </div>
  )
}

export default Libraries
