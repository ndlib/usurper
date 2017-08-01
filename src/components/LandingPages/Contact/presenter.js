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
      <div className='row'>
      {
        props.sections.map((section) => {
          return (
            <section className='col-md-6 col-xs-12'>
              <h2>{section.title}</h2>
              {
                section.points.map((slug) => {
                  return <span>
                    <h3>{props.points[slug].fields.title}</h3>
                    <Contact servicePoint={props.points[slug]} />
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
