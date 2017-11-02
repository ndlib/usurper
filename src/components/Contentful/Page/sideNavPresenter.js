import React, { Component } from 'react'
import PropTypes from 'prop-types'
const SCROLLED = true
const NOTSCROLLED = false
const MAGICNUMBER = 245
class SideNavPresenter extends Component {
  constructor (props) {
    super(props)
    this.scrolledStyle = this.scrolledStyle.bind(this)
    this.listenScrollEvent = this.listenScrollEvent.bind(this)
    this.state = {
      positionType: NOTSCROLLED,
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.listenScrollEvent)
  }

  listenScrollEvent () {
    if (window.pageYOffset > MAGICNUMBER && this.state.positionType === NOTSCROLLED) {
      this.setState({
        positionType: SCROLLED,
      })
    }
    if (window.pageYOffset <= MAGICNUMBER && this.state.positionType === SCROLLED) {
      this.setState({ positionType: NOTSCROLLED })
    }
  }

  scrolledStyle () {
    if (this.state.positionType === SCROLLED) {
      return {
        position: 'fixed',
        top: '10px',
      }
    }
    return {
      position: 'absolute',
    }
  }

  render () {
    let anchors = []
    this.props.columns.map((column) => {
      column.fields.sections.map((section) => {
        const key = encodeURIComponent(section.fields.title)
        anchors.push((
          <a
            className='side-anchors'
            href={'#' + key}
            key={key}>
            <li >{section.fields.title}</li>
          </a>
        ))
      })
    })

    return (
      <div
        className='side-nav'
        onScroll={this.listenScrollEvent}
        style={this.scrolledStyle()}
      ><ul>{anchors}</ul></div>
    )
  }
}

SideNavPresenter.propTypes = {
  columns: PropTypes.array.isRequired,
}
export default SideNavPresenter
