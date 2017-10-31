import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import Footer from '../Footer'
import '../../static/css/fonts.css'
import '../../static/css/flexboxgrid.css'
import '../../static/css/global.css'
import '../../static/css/print.css'

const PageWrapper = (props) => {
  return (
    <div onClick={props.clickOnPage} className={window.location.pathname === '/' ? 'home' : 'not-home'}>
      <a className='skiplink' href='#maincontent'>Skip to main content</a>

      <Header {...props} />
      <main id='maincontent' className={'container-fluid content'}>
        {props.children}
      </main>
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
