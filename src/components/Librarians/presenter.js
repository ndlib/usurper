import React from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../constants/APIStatuses'

import Contact from '../Contact'
import Image from '../Image'
import PrivateLibrarianImage from '../../static/images/librarian.gif'

const Loading = (className) => {
  return (
    <div className={className}>
      <span>Librarians Loading</span>
    </div>
  )
}

const ErrorLoading = (className) => {
  return (
    <div className={className}>
      <span>Librarian Error</span>
    </div>
  )
}

const Loaded = (info, className) => {
  return (
    <div className={className}>
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
              <Image src={librarian.photo} alt={librarian.name} defaultImage={PrivateLibrarianImage} />
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
      return Loading(className)
    case statuses.SUCCESS:
      return Loaded(librarianInfo.json, className)
    case statuses.NOT_FOUND:
      return null
    default:
      return ErrorLoading(className)
  }
}

Librarians.propTypes = {
  librarianInfo: PropTypes.object.isRequired,
  className: PropTypes.string,
}

export default Librarians
