import React from 'react'
import './style.css'
const FakeNews = () => {
  return (
    <div className='row news'>
      <div className='col-md-8 col-xs-12'>
        <h3>News</h3>
        <div className='news-card'>
          <img src='//library.nd.edu/architecture/local_ssi/images/building.sb.jpg' />
          <header>
            <h3>Group Recreating Historic, Long-gone South Bend Buildings</h3>
          </header>

          <div className='description'>
            <p>WSBT News Story covering joint venture between Architecture Library, Historic Preservation Commission, and the History Museum.</p>
          </div>
        </div>
        <div className=' news-card'>
          <img src='//news.nd.edu/assets/169864/jane_and_rudy_navari_300.jpg' />
          <header>
            <h3>Hesburgh Libraries receive largest gift in history from Navari Foundation</h3>
          </header>

          <div className='description'>
            <p>Notre Dame receives gift for Center for Digital Scholarship</p>
          </div>
        </div>
        <div className=' news-card'>
          <img src='//bloximages.newyork1.vip.townnews.com/southbendtribune.com/content/tncms/assets/v3/editorial/c/78/c788d8cf-8ddb-5a86-94fb-79e8e546d503/568d9c16c9b28.image.jpg' />
          <header>
            <h3>Much ado about Shakespeare: ‘First Folio’ stops at Notre Dame</h3>
          </header>

          <div className='description'>
            <p>South Bend Tribune article about the First Folio beginning its “year of Shakespeare” at Notre Dame in Rare Books &amp; Special Collections.</p>
          </div>
        </div>

      </div>
      <div className='col-md-4 col-xs-12'>
        <h3>Events</h3>
        <div className='event-card'>
          <div className='date'>
            <em>April</em> <strong>21</strong>
          </div>
          <div className='event-card-text'>
            <header>
              <h3>Can I use this? A Talk with Nancy Sims on Copyright for You</h3>
            </header>
            <div className='description'>
              <p>A presentation, followed by discussion, on common copyright questions and concerns.</p>
            </div>
          </div>
        </div>

        <div className='event-card'>
          <div className='date'>
            <em>May</em><br /><strong style={{ fontSize: '90%' }}>19 - 21</strong>
          </div>
          <div className='event-card-text'>
            <header>
              <h3>Commencement 2017</h3>
            </header>
            <div className='description'>
              <p>Notre Dame Commencement Weekend.</p>
            </div>
          </div>
        </div>

        <div className='event-card'>
          <div className='date'>
            <em>Jan - Aug</em> <strong style={{ fontSize: '90%' }}>2017</strong>
          </div>
          <div className='event-card-text'>
            <header>
              <h3>RBSC Exhibit: Preserving the Steadfastness of Your Faith</h3>
            </header>
            <div className='description'>
              <p>A Rare Books &amp; Special Collections exhibit on Catholics in the Early American Republic.                                                                                                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FakeNews
