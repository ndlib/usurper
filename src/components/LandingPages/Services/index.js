import React from 'react'
import Link from '../../Link'
import ReserveRoom from '../../../static/images/reserveroom.jpg'
import LandingPage from '../index.js'

const Services = () => {
  return (

    <LandingPage title='Services'>

      <div className='row services-landing'>
        <div className='col-md-4 col-xs-12'>
          <h3>Borrow</h3>

          <p>
            <Link to='/borrow-renew-request/'>Borrow, Renew, Request Policies</Link>
            <span>Who can check out materials, loan periods for different types of materials and users</span>
          </p>

          <p><Link to='https://nd.illiad.oclc.org/illiad/IND/illiad.dll'>Interlibrary Loan & Document Delivery</Link>
          <span>Notre Dame faculty, students and staff may request articles, books and book chapters from the Hesburgh Libraries' collections, and articles, books, media, and more from other libraries when the Hesburgh Libraries do not have what you need</span>
          </p>

          <p><Link to='/dvds'>DVDs</Link>
          <span></span>
          </p>

          <p>
            <Link to='/microtext-and-media'>Microtext and Media</Link>
            <span />
          </p>

          <h3>Request and Problem Report Forms</h3>
          <h4>Buy, Hold, or Find</h4>
          <ul>

            <li><Link to='#'>Missing Book Search Requests</Link> </li>
            <li><Link to='https://library.nd.edu/utilities/forms/purchase'>Recommend a Purchase</Link> </li>
            <li><Link to='#'>Request an In Process or On Order Item</Link> </li>
          </ul>
          <h4>Problem Report Forms</h4>
          <ul>
            <li><Link to='#'>Catalog Record Problems</Link> </li>
            <li><Link to='#'>General Problem</Link> </li>
            <li><Link to='#'>Interlibrary Loan Problems</Link> </li>
            <li><Link to='#'>Online Resource Problem</Link> </li>
            <li><Link to='#'>Reserves Problems</Link> </li>
          </ul>

          <h3>Spaces</h3>

          <p><Link to='/graduate-student-carrels'>Graduate Student Carrels</Link>
            <span>Available to graduate students in the College of Arts & Letters</span></p>
          <p><Link to='http://hr.nd.edu/work-life-balance/lactation-rooms'>Lactation Room</Link>
            <span>A lactation room, located on the fifth floor of Hesburgh, is available for faculty, staff and graduate students. Contact HR for more information or <Link to='http://hr.nd.edu/work-life-balance/lactation-rooms/'>request access</Link>.</span> </p>
          <p><Link to='/room-reservations'>Reserve a Meeting or Event Space</Link>
            <span>Reserve spaces in Libraries facilities</span> </p>
          <p><Link to='http://nd.libcal.com/#s-lc-box-2749-container-tab1'>Book a Study or Multimedia Room</Link>
            <span>Reserve spaces in Libraries facilities</span> </p>
          <p><Link to='/writing-center'>Writing Center</Link></p>

          <h3>Specialty Expertise and Consultation Areas</h3>

          <p><Link to='http://libguides.library.nd.edu/datamanagement'>Copyright Consulting</Link>
            <span>Submit a question to the copyright team.</span></p>
          <p><Link to='http://libguides.library.nd.edu/datamanagement'>Data Management Consulting Team</Link>
            <span>Contact us for assistance with data management plans, and more.</span></p>
          <p><Link to='http://cds.library.nd.edu/expertise/Analysis.shtml'>Data Use & Analysis </Link>
            <span>Request help in formulating an analysis, identifying appropriate data sets, or preparing and working with data.</span></p>
          <p><Link to='http://cds.library.nd.edu/expertise/digital-humanities/'>Digital Humanities </Link>
            <span>Request help in working with digital texts, marking editions, or assessing/creating digital scholarship and projects.</span></p>
          <p><Link to='http://cds.library.nd.edu/expertise/GIS.shtml'>Geographic Information Systems </Link>
            <span> Get help generating a map or analyzing spatial data.</span></p>
          <p><Link to='http://libguides.library.nd.edu/latex'>LaTeX Consulting</Link>
            <span>Request help with using LaTeX for document typesetting.</span></p>
          <p><Link to='/math-tutoring'>Math Tutoring</Link>
            <span>Tutoring can be scheduled for an individual or a small group for half-hour sessions.</span></p>
          <p><Link to='http://cds.library.nd.edu/expertise/TextMining.shtml'>Text Mining & Analysis</Link>
            <span>Given hundreds of websites, thousands of journal articles, or tens-of-thousands of books, request assistance with using and understanding the content of large corpora.</span></p>
          <p><Link to='http://cds.library.nd.edu/print/'>3D Modeling and Printing</Link>
            <span>Get help with designing 3D models and creating 3D prints.</span></p>
          <p><Link to='http://cds.library.nd.edu/expertise/Digitization.shtml'>Digitization and Metadata Services</Link>
            <span>Consult with staff on digitization, description, and preservation of digital collections to enable long-term discovery and sustainability of materials.</span></p>

        </div>
        <div className='col-md-4 col-xs-12'>
          <h3>Teaching and Consulting</h3>

          <p><Link to='/courses'>Course Reserves</Link>
            <span>For students and faculty to access reserve items or place items on reserve</span> </p>
          <p><Link to='/consultations'>Library Research Consultations</Link>
            <span>Make an appointment to meet with a librarian</span></p>
          <p>Request Instruction
            <span>Request library instruction for your class sessions</span></p>
          <p><Link to='http://libguides.library.nd.edu/dissertation-camp'>Research and Writing Camps</Link>
            <span>The Libraries offer a variety of research and writing camps, such as thesis and dissertation camps, research and statistical tools camps, and custom boot camps for groups by request.</span></p>
          <p><Link to='http://nd.libcal.com/calendar/allworkshops/?cid=447&t=m&d=0000-00-00&cal%5B%5D=447'>Workshops</Link>
            <span>Library workshops are available on a variety of topics. Sign up for sessions, review handouts from past sessions, or request a custom session.</span></p>

          <h3>Technology and Technology Lending</h3>
          <p><Link to='http://library.nd.edu/cds/print/'>3D Modeling and Printing</Link>
            <span>Submit a 3D print job or request assistance with finding or designing a 3D model</span></p>
          <p><Link to='/copy-print-scan'>Copying, Printing, and Scanning</Link>
            <span>Locate computers and other technology within Libraries facilities</span></p>
          <p>Listening Stations</p>
          <p><Link to='http://libguides.library.nd.edu/onebutton'>One Button Studio</Link>

            <span>Reserve the One Button Studio video recording space</span></p>
          <p><Link to='https://oit.nd.edu/help-desk/'>OIT Help Desk Outpost </Link>
            <span>Located in the Hesburgh Library near the Ask Us Desk on the 1st floor</span></p>
          <p><Link to='http://libguides.library.nd.edu/soundstudio'>Sound Studio </Link>
            <span>Reserve the Sound Studio audio recording space</span></p>
          <p><Link to='http://cds.library.nd.edu/technology/#Software'>Specialty Software</Link>
            <span>View special software titles available via the Libraries</span></p>
          <p><Link to='/technology-lending'>Technology and Miscellaneous Equipment Lending</Link>
            <span>Reserve laptops, cameras, headphones, accessories, and more</span> </p>
          <p><Link to='http://libguides.library.nd.edu/transcriptionstation'>Transcription Station </Link>
            <span>Make transcriptions of audio or video files more easily with our transcription pedal</span></p>
         

        </div>
        <div className='col-md-4 col-xs-12'>

          <h3>Research and Scholarship Tools</h3>

          <p><Link to='http://libguides.library.nd.edu/citemanage/home'>Citation Managers</Link>
            <span>Citation Management software allows you to create and track references (aka citations) and to create bibliographies or reference lists formatted in the appropriate style, such as APA, MLA, Chicago or Turabian.</span></p>
          <p><Link to='https://curate.nd.edu/'>CurateND</Link>
            <span>CurateND is the campus’ institutional repository, enabling Notre Dame faculty, students, and staff to share and preserve their research and scholarship </span>
          </p>
          <p><Link to='http://collections.library.nd.edu/'>DEC</Link>
            <span>View digital exhibits and collections online</span></p>
          <p><Link to='http://libguides.library.nd.edu/c.php?g=670290&p=4716454#s-lg-box-14788259'>DMPTool</Link>
            <span>DMPTool is a flexible online tool that guides users through each step of creating a compliant data management plan for specific funding agencies.</span> </p>
          <p><Link to='/osf'>Open Science Framework</Link>
            <span>The Open Science Framework (OSF) provides free and open source project management support for researchers across the entire research lifecycle.</span></p>
          <p><Link to='https://orcid.org/'>ORCID</Link>
          <span>ORCID provides a persistent digital identifier that distinguishes you from every other researcher and, through integration in key research workflows such as manuscript and grant submission, supports automated linkages between you and your professional activities ensuring that your work is recognized.</span></p>

          <p><Link to='https://refworks.proquest.com/'>New RefWorks</Link>
          <span></span></p>

          <p><Link to='https://www.refworks.com/refworks2/default.aspx?r=authentication::init&groupcode=RWUnivNotreDame'>Legacy RefWorks </Link>
          <span></span></p>

          <p><Link to='https://remix.nd.edu/'>Remix Digital Resource Portal</Link>
          <span>Remix assembles a broad variety of tools in one place to help you find, mix, and create new digital media and visual material</span></p>

          <p><Link to='/proxy-bookmarklet'>Proxy Bookmarklet</Link>
            <span>Access library resources while off-campus</span></p>

          <h3>Miscellaneous Services</h3>

          <p>Document Shredding
            <span>Hesburgh Library has two (2) 32 gallon locked bins for you to use free of charge to put documents that are of a sensitive nature</span></p>
          <p><Link to='/lokmobiles'>Lokmobiles</Link>
            <span>“Desks on wheels” are available to graduate students (priority) and seniors working on a thesis</span></p>
          <p><strong>Lost & Found</strong>
            <span>Please contact Library Monitors at (574) 631-6350</span></p>
          <p><strong>Notary Public</strong>
            <span>The Hesburgh Libraries has a licensed Notary Public on staff who will provide a free notary service to university students, faculty, and staff</span></p>
          <p><Link to='/accessibility'>Services for Library Users with Disabilities</Link> </p>
          <p><Link to='/usgs-map-printing'>USGS Map Printing</Link>
            <span>The <Link to='https://store.usgs.gov/'>U.S. Geological Survey map printing service</Link> is provided by the Frontline Services unit in support of the curriculum and research needs of University of Notre Dame students, faculty, staff and the local community, as guaranteed by public law (Title 44 United States Code)</span></p>
          <p><Link to='/ulra'>Undergraduate Library Research Award</Link>
            <span></span></p>
        </div>
      </div>
    </LandingPage>
  )
}

export default Services
