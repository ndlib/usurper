// Container component for a Page content type from Contentful
import React from 'react'
import Link from '../Link'

const SubjectList = () => {
  return (
    <div className='container-fluid row'>
      <div className='col-md-6'>
        <p><Link to='/architecture'>Architecture</Link></p>
        <p><Link to='/africana-studies'>Africana Studies</Link></p>
        <p><Link to='/american-studies'>American Studies</Link></p>
        <p><Link to='/mathematics'>Applied Computational Mathematics &amp; Statistics</Link></p>
        <p><Link to='/anthropology'>Anthropology</Link></p>
        <p><Link to='/art-art-history-design'>Art, Art History, &amp; Design</Link></p>
        <p><Link to='/biology'>Biology, Environmental, &amp; Life Sciences</Link></p>
        <p><Link to='/business'>Business</Link></p>
        <p><Link to='/byzantine-studies'>Byzantine Studies</Link></p>
        <p><Link to='/catholic-studies'>Catholic Studies</Link></p>
        <p><Link to='/chemistry'>Chemistry &amp; Biochemistry</Link></p>
        <p><Link to='/classics'>Classics</Link></p>
        <p><Link to='/east-asian-studies'>East Asian Language, Literature, &amp; Culture</Link></p>
        <p><Link to='/economics'>Economics</Link></p>
        <p><Link to='/education'>Education</Link></p>
        <p><Link to='/engineering'>Engineering</Link></p>
        <p><Link to='/english'>English Language &amp; Literature</Link></p>
        <p><Link to='/film-television-theatre'>Film, Television, &amp; Theatre</Link></p>
        <p><Link to='/french'>French Language, Literature, &amp; Culture</Link></p>
      </div>
      <div className='col-md-6'>
        <p><Link to='/gender-studies'>Gender Studies</Link></p>
        <p><Link to='/german'>German Language, Literature, &amp; Culture</Link></p>
        <p><Link to='/global-affairs'>Global Affairs</Link></p>
        <p><Link to='/history'>History</Link></p>
        <p><Link to='/history-and-philosophy-of-science'>History and Philosophy of Science</Link></p>
        <p><Link to='/irish-studies'>Irish Studies</Link></p>
        <p><Link to='/italian'>Italian Language, Literature, &amp; Culture</Link></p>
        <p><Link to='/spanish'>Latin American and Iberian Language, Literature, &amp; Culture</Link></p>
        <p><Link to='/mathematics'>Mathematics</Link></p>
        <p><Link to='/medieval'>Medieval Studies</Link></p>
        <p><Link to='/music'>Music</Link></p>
        <p><Link to='/kellogg-kroc'>Peace Studies</Link></p>
        <p><Link to='/philosophy'>Philosophy</Link></p>
        <p><Link to='/chemistry'>Physics</Link></p>
        <p><Link to='/political-science'>Political Science</Link></p>
        <p><Link to='/psychology'>Psychology</Link></p>
        <p><Link to='/russian'>Russian and East European Language, Literature, &amp; Culture</Link></p>
        <p><Link to='/sociology'>Sociology</Link></p>
        <p><Link to='/theology-religion'>Theology and Religion</Link></p>
      </div>
    </div>
  )
}

export default SubjectList
