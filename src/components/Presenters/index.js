import React from 'react'
import Image from '../Image'
import PropTypes from 'prop-types'
import LibMarkdown from '../LibMarkdown'
import { withErrorBoundary } from '../ErrorBoundary'
const capacityTypes = {
  Instructor: 'Instructed By',
  Facilitator: 'Facilitated By',
  Presenter: 'Presented By',
  Moderator: 'Moderated By',
}

const retrieveCapacity = (type) => {
  let capacity = capacityTypes[type]
  if (capacity === undefined) {
    capacity = type
  }
  return capacity
}

const Presenters = ({ presenters }) => {
  if (!presenters) {
    return null
  }
  return (
    <div className='presenter-card'>
      {
        presenters.map((entry) => {
          return (
            <div key={`presenter_${entry.sys.id}`}>
              <h3>{retrieveCapacity(entry.fields.type)}</h3>
              <section>
                {
                  entry.fields.people.map((person) => {
                    if (person && person.fields && person.sys) {
                      return (
                        <div key={`person_${person.sys.id}`}>
                          <Image cfImage={person.fields.picture} />
                          <div className='vcard'>
                            <div className='fn n'>{ person.fields.name }</div>
                            <div className='org'>{ entry.fields.title }</div>
                            <div className='email'>{ person.fields.email }</div>
                            <div className='tel'>{ person.fields.phone }</div>
                            <LibMarkdown className='bio'>{ person.fields.bio }</LibMarkdown>
                          </div>
                        </div>
                      )
                    }
                    return null
                  })
                }
              </section>
            </div>
          )
        })
      }
    </div>
  )
}

Presenters.propTypes = {
  presenters: PropTypes.array.isRequired,
}

export default withErrorBoundary(Presenters)
