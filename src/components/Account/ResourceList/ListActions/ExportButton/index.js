import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exportHelper from './exportHelper'
import * as helper from 'constants/HelperFunctions'

import styles from '../style.module.css'

class ExportButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true,
    }
    this.onBlur = this.onBlur.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.exportRIS = this.exportRIS.bind(this)
    this.exportCSV = this.exportCSV.bind(this)

    this.exportButtonDropDownRef = React.createRef()
  }

  componentDidUpdate () {
    if (this.exportButtonDropDownRef.current) {
      this.exportButtonDropDownRef.current.focus()
    }
  }

  onButtonClick () {
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  onBlur (e) {
    if (!this.exportButtonDropDownRef.current || (e.target !== this.exportButtonDropDownRef.current && !this.exportButtonDropDownRef.current.contains(e.relatedTarget))) {
      this.setState({
        hidden: true,
      })
    }
  }

  exportRIS () {
    this.setState({ hidden: true })
    exportHelper('RIS', this.props.items)
  }

  exportCSV () {
    this.setState({ hidden: true })
    exportHelper('CSV', this.props.items)
  }

  render () {
    const labelText = 'Export Checkout History'
    const disabled = this.props.items.length === 0
    return (
      <div className={styles.container}>
        <button className={styles.export} onClick={this.onButtonClick} disabled={disabled} aria-label={labelText}>
          { helper.pluralize(this.props.items, 'Export', 'Export All') }
        </button>
        <div
          id='exportDropdown'
          ref={this.exportButtonDropDownRef}
          tabIndex='0'
          onBlur={this.onBlur}
          className={'dropdown ' + styles.exportOptions + (this.state.hidden ? ` ${styles.hidden}` : '')}
          aria-label={labelText}
          aria-expanded={!this.state.hidden}
          role='tree'
        >
          <ul>
            <li role='treeitem'><button className='custom-style' onClick={this.exportRIS}>Export to RIS</button></li>
            <li role='treeitem'><button className='custom-style' onClick={this.exportCSV}>Export to CSV</button></li>
          </ul>
        </div>
      </div>
    )
  }
}

ExportButton.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ExportButton
