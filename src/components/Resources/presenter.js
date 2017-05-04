'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Config from '../../shared/Configuration'

const illiadBaseUrl = Config.illiadBaseURL

class Resources extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand () {
    this.setState({ expanded: !this.state.expanded })
  }

  formatDueDate (date) {
    if (!date) {
      return ''
    }
    // '20170531'
    var year = date.substring(0, 4)
    var month = date.substring(4, 6)
    var day = date.substring(6, 8)
    return year + '-' + month + '-' + day
  }

  getAuthor (item) {
    if (item.author) {
      return item.author
    } else if (item.articleAuthor) {
      return item.articleAuthor
    }
    return null
  }

  getPublished (item) {
    if (item.published) {
      return item.published
    } else if (item.publishedDate) {
      return item.publishedDate
    }
    return null
  }

  itemInfo (item) {
    var out = []

    var temp = this.getPublished(item)
    if (temp) {
      out.push(<div className='card-published'>{'Published: ' + temp}</div>)
    }

    temp = item.transactionStatus ? item.transactionStatus : item.status
    if (temp) {
      out.push(<div className='card-status'>{'Status: ' + temp}</div>)
    }

    temp = item.dueDate
    if (temp) {
      out.push(<div className='card-due'>{'Due Date: ' + this.formatDueDate(temp)}</div>)
    }

    return out
  }

  itemActions (item) {
    var out = []

    out.push(<button key={item.title + 'renew'}>Renew</button>)

    if (item.transactionNumber) {
      out.push(<button key={item.title + 'ill'}><a href={illiadBaseUrl + item.transactionNumber}>View in ILL</a></button>)
    }

    if (out.length > 0) {
      return (
        <div key={item.title + 'actions'}>
          {out}
        </div>
      )
    }

    return out
  }

  resourceList (list, emptyText) {
    var out = []
    if (list.length == 0) {
      return (
        <div>{emptyText}</div>
      )
    }

    for (var i in list) {
      var current = list[i]
      var name = current.title

      out.push(
        <div className='card-item' key={name + 'Card'}>
          <div className='card-header' onClick={this.toggleExpand}>
            <div className='card-title'>{name}</div>
            <div className='card-subtitle'>{this.getAuthor(current)}</div>
          </div>
            { this.itemInfo(current) }
          <div className='card-actions'>{ this.itemActions(current) }</div>
        </div>
      )
    }
    return out
  }

  render () {
    if (!this.props.resources) {
      return <div />
    }

    if (!this.props.resources.checkedOut) {
      this.props.resources.checkedOut = []
    }
    if (!this.props.resources.web) {
      this.props.resources.web = []
    }

    if (!this.props.resources.pending) {
      this.props.resources.pending = []
    }

    var checkedOutResources = this.props.resources.checkedOut.concat(this.props.resources.web)

    return (
      <div key='Resources' className='resources-list'>
        <div className='alert'>
          <p><strong>Attention:</strong> Renew button on this page is for demonstration purposes only.</p>
        </div>

        <h3>Checked out</h3>
        {this.resourceList(checkedOutResources, 'You have no checked out items.')}
        <p>&nbsp</p>
        <h3>Pending</h3>
        {this.resourceList(this.props.resources.pending, 'You have no pending items.')}
      </div>
    )
  }
}

Resources.propTypes = {
  resources: PropTypes.object
}

export default Resources
