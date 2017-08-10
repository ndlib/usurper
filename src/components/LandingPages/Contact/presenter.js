import React from 'react'
import Link from '../../Link'
import Contact from '../../Contact/ServicePoint'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const ContactPresenter = (props) => {
  return (
    <div className='contact-page'>
      <PageTitle title='Contact Us' />
      <SearchProgramaticSet open={false} />
     <div className='point point-card general'>
        <h3>General Contact</h3>

        <ul>
          <li className='phone'><Link to='tel:5746316679' title='Call (574) 631-6679'>(574) 631-6679</Link></li>
        </ul>
      </div>

      <div className='row'>
      {
        props.sections.map((section, index) => {
          return (
            <section className='col-md-6 col-xs-12' key={"section_" + index}>
              <h2>{section.title}</h2>
              {
                section.points.map((slug) => {
                  if (!props.points[slug]) {
                    console.log('point ' + slug + ' not found')
                    return null
                  }

                  return <span key={slug}>
                    <div className='point-card'>
                    <h3>{props.points[slug].fields.title}</h3>
                    <Contact servicePoint={props.points[slug]} />
                    </div>
                  </span>
                })
              }
            </section>
          )
        })
      }
      </div>
    </div>
  )
}

export default ContactPresenter
