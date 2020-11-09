import React from 'react'
import typy from 'typy'
import Image from 'components/Image'
import PropTypes from 'prop-types'
import LibMarkdown from 'components/LibMarkdown'
import { withErrorBoundary } from 'components/ErrorBoundary'
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
  if (!presenters || !presenters.length) {
    return null
  }
  return (
    <div className='presenter-card'>
      {
        presenters.map((entry) => {
          return (
            <div key={`presenter_${entry.sys.id}`}>
              <h3>{retrieveCapacity(typy(entry.fields, 'extraData.presenterType').safeString)}</h3>
              <section>
                {
                  entry.fields.items.map((person) => {
                    if (person && person.fields && person.sys) {
                      return (
                        <div key={`person_${person.sys.id}`}>
                          <Image cfImage={person.fields.picture} />
                          <div className='vcard'>
                            <div className='fn n'>{ person.fields.name }</div>
                            <div className='org'>{ entry.fields.displayName || entry.fields.title }</div>
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
  presenters: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    fields: PropTypes.shape({
      title: PropTypes.string,
      displayName: PropTypes.string,
      extraData: PropTypes.shape({
        presenterType: PropTypes.string,
      }).isRequired,
      items: PropTypes.array.isRequired,
    }).isRequired,
  })).isRequired,
}

export default withErrorBoundary(Presenters)
