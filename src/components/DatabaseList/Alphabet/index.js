import React from 'react'
import Link from 'components/Interactive/Link'
import styles from '../style.module.css'

const Alphabet = () => {
  return (
    <aside aria-label='Select Databases by First Letter' role='navigation'>
      <div className='group'>
        <h5>Filter by First Letter</h5>
        <div className={styles.alphabet}>
          {
            'abcdefghijklmnopqrstuvwxyz#'.split('').map((item) => {
              return (
                <span key={'letter_link_' + item} className={styles.letter}>
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
