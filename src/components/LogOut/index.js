import React from 'react'
import Link from '../Link'
import Config from '../../shared/Configuration.js'

const LogOut = () => {
  return (
    <Link to={`${Config.viceroyAPI}/logout`} className='button fright tab logout-button-personal'>Log Out</Link>
  )
}

export default LogOut
