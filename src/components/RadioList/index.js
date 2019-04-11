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

    const title = this.props.entries[index].title
    const value = this.props.entries[index].value
    this.props.submit(value, title)
  }

  focus (index, item) {
    if (item && this.state.index === index) {
      item.focus()
    }
  }

  setIndex (index) {
    // If index is a falsy and is NOT 0 (E.g. if it's null, undefined, or false), the input index is invalid
    if (!index && index !== 0) {
      return
    }
    this.setState({ index: index }, console.log())
  }

  onSelectedClick () {
  }

  onSelectedKeyDown (e) {
    if (e.keyCode === 13) { // enter
      e.preventDefault()
    }
  }

  onOptionClick (e) {
    this.onSubmit(e.target.value)
    if (typeof this.props.onChangeCallback === 'function') {
      this.props.onChangeCallback()
    }
  }

  onOptionKeyDown (e) {
    switch (e.keyCode) {
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
      radioName={this.props.radioName}
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
  radioName: PropTypes.string.isRequired,
  defaultIndex: PropTypes.number,

  entries: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  submit: PropTypes.func,
  useButton: PropTypes.bool,
  buttonText: PropTypes.string,
  onChangeCallback: PropTypes.func,
}

RadioList.defaultProps = {
  useButton: false,
  buttonText: 'Submit',
}

export default connect(
  mapStateToProps
)(RadioList)
