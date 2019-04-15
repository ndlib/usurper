import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import '../../../static/css/fonts.css'
import '../../../static/css/flexboxgrid.css'
import '../../../static/css/global.css'
import '../../../static/css/print.css'
import Config from '../../../shared/Configuration'
import spacer from '../../../static/images/spacer.gif'
const PageWrapper = (props) => {
  return (
    <div onClick={props.clickOnPage} className={window.location.pathname === '/' ? 'home' : 'not-home'}>
      <meta id='nd-version' content={Config.version} />
      <a href='#maincontent' className='skip'>
        <img src={spacer} className='skip' width='0' height='0' border='0' alt='skip to content' />
      </a>

      <Header {...props} />
      <div id='maincontent' className={'container-fluid content'}>
        <a id='top' />

        {props.children}
      </div>
      <Footer />
    </div>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  clickOnPage: PropTypes.func.isRequired,
}
export default PageWrapper
