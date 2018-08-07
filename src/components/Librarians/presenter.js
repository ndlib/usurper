import React from 'react'
import PropTypes from 'prop-types'
import * as statuses from '../../constants/APIStatuses'

import Contact from '../Contact'
import Image from '../Image'
import InlineLoading from '../Messages/InlineLoading'
import PrivateLibrarianImage from '../../static/images/librarian.gif'

const Loaded = (info, className) => {
  return (
    <section className={className} aria-label='Contact Information' role='complementary'>
      <h2>Contact Info </h2>
      {

        info.librarians.map((librarian) => {
          return (
            <div className='librarian' key={librarian.phone}>
              <Contact
                name={librarian.name}
                title={librarian.jobTitle}
                phone={librarian.phone}
                email={librarian.email}
                addr1={librarian.mail_addr}
              />
              <Image src={librarian.photo} defaultImage={PrivateLibrarianImage} alt='Librarian photo not available' />
            </div>
          )
        })

      }
    </section>
  )
}

const Librarians = ({ librarianInfo, className }) => {
  switch (librarianInfo.status) {
    case statuses.FETCHING:
      return <InlineLoading className={className} />
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
