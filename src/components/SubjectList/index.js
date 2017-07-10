// Container component for a Page content type from Contentful
import React from 'react'
import Link from '../Link'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'

const SubjectList = () => {
  return (
    <div className='container-fluid content-area'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='Subjects' />
      <div className='row'>
        <div className='col-md-6'>
          <p><Link to='/aerospace-and-mechanical-engineering'>Aerospace &amp; Mechanical Engineering</Link></p>
          <p><Link to='/architecture'>Architecture</Link></p>
          <p><Link to='/africana-studies'>Africana Studies</Link></p>
          <p><Link to='/american-studies'>American Studies</Link></p>
          <p><Link to='/anthropology'>Anthropology</Link></p>
          <p><Link to='/art-art-history-design'>Art, Art History, &amp; Design</Link></p>
          <p><Link to='/biology'>Biology, Environmental Sciences, &amp; Medicine</Link></p>
          <p><Link to='/business'>Business</Link></p>
          <p><Link to='/byzantine-studies'>Byzantine Studies</Link></p>
          <p><Link to='/catholic-studies'>Catholic Studies</Link></p>
          <p><Link to='/chemical-engineering'>Chemical Engineering</Link></p>
          <p><Link to='/chemistry'>Chemistry &amp; Biochemistry</Link></p>
          <p><Link to='/civil-and-environmental-engineering'>Civil &amp; Environmental Engineering</Link></p>
          <p><Link to='/classics'>Classics</Link></p>
          <p><Link to='/computer-science-and-engineering'>Computer Science &amp; Engineering</Link></p>
          <p><Link to='/earth-science'>Earth Science</Link></p>
          <p><Link to='/east-asian-studies'>East Asian Languages, Literatures, &amp; Cultures</Link></p>
          <p><Link to='/economics'>Economics</Link></p>
          <p><Link to='/education'>Education</Link></p>
          <p><Link to='/electrical-engineering'>Electrical Engineering</Link></p>
          <p><Link to='/engineering'>Engineering</Link></p>
          <p><Link to='/english'>English Language &amp; Literature</Link></p>

        </div>
        <div className='col-md-6'>
          <p><Link to='/film-television-theatre'>Film, Television, &amp; Theatre</Link></p>
          <p><Link to='/french'>French Language, Literature, &amp; Culture</Link></p>
          <p><Link to='/gender-studies'>Gender Studies</Link></p>
          <p><Link to='/german'>German Language, Literature, &amp; Culture</Link></p>
          <p><Link to='/global-affairs'>Global Affairs</Link></p>
          <p><Link to='/history'>History</Link></p>
          <p><Link to='/history-and-philosophy-of-science'>History and Philosophy of Science</Link></p>
          <p><Link to='/irish-studies'>Irish Studies</Link></p>
          <p><Link to='/italian'>Italian Language, Literature, &amp; Culture</Link></p>
          <p><Link to='/spanish'>Latin American and Iberian Languages, Literatures, &amp; Cultures</Link></p>
          <p><Link to='/mathematics'>Mathematics</Link></p>
          <p><Link to='/medieval'>Medieval Studies</Link></p>
          <p><Link to='/music'>Music</Link></p>
          <p><Link to='/peace-studies'>Peace Studies</Link></p>
          <p><Link to='/philosophy'>Philosophy</Link></p>
          <p><Link to='/chemistry'>Physics</Link></p>
          <p><Link to='/political-science'>Political Science</Link></p>
          <p><Link to='/psychology'>Psychology</Link></p>
          <p><Link to='/russian'>Russian and East European Languages, Literatures, &amp; Cultures</Link></p>
          <p><Link to='/sociology'>Sociology</Link></p>
          <p><Link to='/statistics-and-probability'>Statistics &amp; Probability</Link></p>
          <p><Link to='/theology-religion'>Theology and Religion</Link></p>
        </div>
      </div>
    </div>
  )
}

export default SubjectList
