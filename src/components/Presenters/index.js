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
    <div>
      {
        presenters.map((entry, index) => {
          return (
            <div>
              <h2>{retrieveCapacity(entry.fields.type)}</h2>
              <section>
                {
                  entry.fields.people.map((person, index) => {
                    return (
                      <div>
                        <div>{ person.fields.name }</div>
                        <div>{ entry.fields.title }</div>
                        <div>{ person.fields.email }</div>
                        <div>{ person.fields.phone }</div>
                        <div>{ person.fields.bio }</div>
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
