import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Link from 'components/Interactive/Link'
import UserMenu from '../UserMenu'
import { initLogin } from 'actions/personal/token'

const MobileMenu = (props) => {
  const tabIndex = props.open ? '0' : '-1'
  const display = props.open ? 'block' : 'none'

  return (
    <li className='menu-icon'>
      <button
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        aria-label='Menu'
        tabIndex={props.visible ? '0' : '-1'}
      >☰</button>
      <ul className='topnav' id='topNav' style={{ display: display }}>
        <li>
          <Link
            to='/'
            tabIndex={tabIndex}>Home</Link>
        </li>
        <li>
          <Link
            to='/research/'
            tabIndex={tabIndex}>Research</Link>
        </li>
        <li>
          <Link
            to='/services/'
            tabIndex={tabIndex}>Services</Link>
        </li>
        <li>
          <Link
            to='/libraries/'
            tabIndex={tabIndex}>Libraries &amp; Centers</Link>
        </li>
        <li>
          <Link
            to='/about/'
            tabIndex={tabIndex}>About</Link>
        </li>
        <li>
          <Link
            to='/hours'
            tabIndex={tabIndex}>Hours</Link>
        </li>
        {props.loggedIn ? (
          <UserMenu format='mobile' />
        ) : (
          <li>
            <Link
              to='#'
              onClick={props.initLogin}
              tabIndex={tabIndex}
            >Log In</Link>
          </li>
        )}
      </ul>
    </li>
  )
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initLogin }, dispatch)
}

MobileMenu.propTypes = {
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  open: PropTypes.bool,
  loggedIn: PropTypes.bool,
  visible: PropTypes.bool,
  initLogin: PropTypes.func,
}
export default connect(null, mapDispatchToProps)(MobileMenu)
