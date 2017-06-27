import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import '../../static/css/fonts.css'
import '../../static/css/flexboxgrid.css'
import '../../static/css/global.css'

const PageWrapper = (props) => {
  return (
    <div onClick={props.clickOnPage} className={window.location.pathname === '/' ? 'home' : 'not-home'}>
      <a id='skiplink' href='#maincontent'>Skip to main content</a>

      <Header {...props} />
      <div id='maincontent' className={'container-fluid content'}>
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
  ]).isRequired,
  clickOnPage: PropTypes.func.isRequired,
}
export default PageWrapper
