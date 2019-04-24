import React from 'react'
import Link from 'components/Interactive/Link'

const Alphabet = () => {
  return (
    <aside aria-label='Select Databases by First Letter' role='navigation'>
      <div className='group'>
        <h5>Filter by First Letter</h5>
        <div className='alphabet'>
          {
            'abcdefghijklmnopqrstuvwxyz#'.split('').map((item) => {
              return (
                <span key={'letter_link_' + item} className='letter'>
                  <Link
                    to={'/databases/' + encodeURIComponent(item)}
                    ariaLabel={'All "' + item.toUpperCase() + '" Databases'}
                  >{ item.toUpperCase() }</Link>
                </span>
              )
            })
          }
        </div>
      </div>
    </aside>
  )
}

export default Alphabet
