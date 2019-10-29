import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './style.module.css'

const desktopQuery = '(min-width: 48em)'

class Accordion extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: props.defaultExpanded,
      isMobile: !window.matchMedia(desktopQuery).matches,
    }

    this.toggle = this.toggle.bind(this)
    this.handleResize = this.handleResize.bind(this)
  }

  componentDidMount () {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
  }

  toggle () {
    this.setState({
      expanded: !this.state.expanded,
    })
  }

  handleResize () {
    const newIsMobileValue = !window.matchMedia(desktopQuery).matches
    const needsUpdate = this.state.isMobile !== newIsMobileValue
    if (needsUpdate) {
      this.setState({
        isMobile: newIsMobileValue,
      })
      this.forceUpdate()
    }
  }

  render () {
    const enabled = !this.props.disabled && (!this.props.mobileOnly || this.state.isMobile) // If media query is true
    const expandedClass = (enabled && this.state.expanded) ? styles.expanded : null
    const tooltip = enabled ? ((this.state.expanded ? 'Collapse ' : 'Expand ') + this.props.header) : null

    return (
      <div className={this.props.className}>
        <span
          className={[this.props.headerClassName, enabled ? styles.collapseHandle : null, expandedClass].join(' ')}
          title={tooltip}
          onClick={this.toggle}
        >
          { this.props.header }
        </span>
        <div className={[this.props.bodyClassName, enabled ? styles.accordionBody : null, expandedClass].join(' ')}>
          { this.props.children }
        </div>
      </div>
    )
  }
}

Accordion.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  headerClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  defaultExpanded: PropTypes.bool,
  mobileOnly: PropTypes.bool,
  disabled: PropTypes.bool,
}

Accordion.defaultProps = {
  defaultExpanded: false,
  mobileOnly: false,
  disabled: false,
}

export default Accordion
