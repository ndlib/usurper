import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Presenter from './presenter'
import { withErrorBoundary } from '../ErrorBoundary'

class DropdownContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: this.props.defaultIndex ? this.props.defaultIndex : 0,
      open: false,
    }

    this.onSelectedClick = this.onSelectedClick.bind(this)
    this.onSelectedKeyDown = this.onSelectedKeyDown.bind(this)
    this.onOptionClick = this.onOptionClick.bind(this)
    this.onOptionKeyDown = this.onOptionKeyDown.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.focus = this.focus.bind(this)
  }

  onSubmit (index, isButton) {
    this.setIndex(index)
    this.toggle(false)

    if (this.props.useButton && !isButton) {
      return
    }

    const title = this.props.entries[index].title
    const value = this.props.entries[index].value
    this.props.submit(value, title)
  }

  focus (index, item) {
    if (item && this.state.index === index) {
      item.focus()
    }
  }

  toggle (onOff) {
    let value = !this.state.open
    if (onOff !== undefined) {
      value = onOff
    }
    this.setState({
      open: value,
    })
  }

  setIndex (index) {
    this.setState({ index: index })
  }

  onSelectedClick () {
    this.toggle()
  }

  onSelectedKeyDown (e) {
    if (e.keyCode === 13) { // enter
      this.toggle()
      e.preventDefault()
    } else if (e.keyCode === 40) { // down arrow
      this.toggle(this.state.open)
      this.setIndex(0)
      e.preventDefault()
    }
  }

  onOptionClick (e) {
    this.onSubmit(e.target.value)
  }

  onOptionKeyDown (e) {
    let i
    const numOptions = this.props.entries.length
    switch (e.keyCode) {
      case 9: // tab key
        e.preventDefault()
        break
      case 38: //  up arrow
        e.preventDefault()
        i = e.target.value - 1
        if (i < 0) {
          i = numOptions - 1
        }
        this.setIndex(i)
        break
      case 40: // down arrow
        e.preventDefault()
        i = e.target.value + 1
        if (i >= numOptions) {
          i = 0
        }
        this.setIndex(i)
        break
      case 13: // enter
        this.onSubmit(e.target.value)
        break
      default: // do nothing on other keys
        break
    }
  }

  onButtonClick () {
    this.onSubmit(this.state.index, true)
  }

  render () {
    return <Presenter
      selectedTitle={this.props.entries[this.state.index].title}
      entries={this.state.open ? this.props.entries : []}
      onSelectedClick={this.onSelectedClick}
      onSelectedKeyDown={this.onSelectedKeyDown}
      onOptionClick={this.onOptionClick}
      onOptionKeyDown={this.onOptionKeyDown}
      focus={this.focus}
      useButton={this.props.useButton}
      buttonText={this.props.buttonText}
      onButtonClick={this.onButtonClick}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

DropdownContainer.propTypes = {
  defaultIndex: PropTypes.number,

  entries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  submit: PropTypes.func,
  useButton: PropTypes.bool,
  buttonText: PropTypes.string,
}

DropdownContainer.defaultProps = {
  useButton: false,
  buttonText: 'Submit',
}
const DropdownComponent = connect(
  mapStateToProps
)(DropdownContainer)

export default withErrorBoundary(DropdownComponent)
