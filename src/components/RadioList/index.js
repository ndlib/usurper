import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Presenter from './presenter'

class RadioList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: this.props.defaultIndex ? this.props.defaultIndex : 0,
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

    if (this.props.useButton && !isButton) {
      return
    }

    let title = this.props.entries[index].title
    let value = this.props.entries[index].value
    this.props.submit(value, title)
  }

  focus (index, item) {
    if (item && this.state.index === index) {
      item.focus()
    }
  }

  setIndex (index) {
    this.setState({ index: index }, console.log())
  }

  onSelectedClick (e) {
  }

  onSelectedKeyDown (e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault()
    } else if (e.keyCode === 40) { // down arrow
      this.setIndex(0)
      e.preventDefault()
    }
  }

  onOptionClick (e) {
    this.onSubmit(e.target.value)
  }

  onOptionKeyDown (e) {
    let i
    let numOptions = this.props.entries.length
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

  onButtonClick (e) {
    this.onSubmit(this.state.index, true)
  }

  render () {
    return <Presenter
      selectedTitle={this.props.entries[this.state.index].title}
      entries={this.props.entries}
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

RadioList.propTypes = {
  defaultIndex: PropTypes.number,

  entries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  submit: PropTypes.func,
  useButton: PropTypes.bool,
  buttonText: PropTypes.string,
}

RadioList.defaultProps = {
  useButton: false,
  buttonText: 'Submit',
}

export default connect(
  mapStateToProps
)(RadioList)
