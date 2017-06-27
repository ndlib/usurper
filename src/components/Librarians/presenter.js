import React from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../constants/APIStatuses'

import Contact from '../Contact'
import Image from '../Image'
import Loading from '../Messages/Loading'
import PrivateLibrarianImage from '../../static/images/librarian.gif'

const Loaded = (info, className) => {
  return (
    <div className={className}>
      <h3>Librarians </h3>
      {

        info.librarians.map((librarian) => {
          return (
            <div className='librarian' key={librarian.phone}>
              <Contact
                name={librarian.name}
                title={librarian.jobTitle}
                phone={librarian.phone}
                email={librarian.email}
              />
              <Image src={librarian.photo} defaultImage={PrivateLibrarianImage} />
            </div>
          )
        })

      }
    </div>
  )
}

const Librarians = ({ librarianInfo, className }) => {
  switch (librarianInfo.status) {
    case statuses.FETCHING:
      return <Loading className={className} />
    case statuses.SUCCESS:
      return Loaded(librarianInfo.json, className)
    case statuses.NOT_FOUND:
      return null
    default:
      return null
  }
}

Librarians.propTypes = {
  librarianInfo: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Librarians
