import React from 'react'
import Image from '../Image'
import PropTypes from 'prop-types'

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
  return (
    <div className='presenter-card'>
      {
        presenters.map((entry) => {
          return (
            <div>
              <h4>{retrieveCapacity(entry.fields.type)}</h4>
              <section>
                {
                  entry.fields.people.map((person) => {
                    return (
                      <div>
                        <Image cfImage={person.fields.picture} />
                        
                        <div className="vcard">
                           <div className="fn n">{ person.fields.name }</div>
                           <div className="org">{ entry.fields.title }</div>
                           <div className="email">{ person.fields.email }</div>
                           <div className="tel">{ person.fields.phone }</div>
                           <div className="bio">{ person.fields.bio }</div>
                          
                        </div>
                        
                      </div>
                    )
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

export default Presenters
