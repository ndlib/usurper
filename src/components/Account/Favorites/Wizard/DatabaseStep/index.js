import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FavoritesList from '../../FavoritesList'
import Search from '../../Search'
import Footer from '../Footer'

import { searchFavorites, KIND } from 'actions/personal/favorites'

import moveIcon from 'static/images/move.png'

class DatabaseStep extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listItems: props.data,
    }
    this.onAddFavorite = this.onAddFavorite.bind(this)
    this.updateList = this.updateList.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.skipStep = this.skipStep.bind(this)
  }

  onAddFavorite = (kind, key, title, url) => {
    const newList = JSON.parse(JSON.stringify(this.state.listItems))
    newList.push({
      key: key,
      title: title,
      url: url,
    })

    this.updateList(newList)
  }

  updateList = (newList) => {
    this.setState({
      listItems: newList,
    })
  }

  nextStep (event, skipSave) {
    if (skipSave) {
      this.props.nextStep(null)
    } else {
      // Add order attribute to match the order user chose in the UI
      const newList = JSON.parse(JSON.stringify(this.state.listItems))
      for (let i = 0; i < newList.length; i++) {
        newList[i].order = i
        // If this was one of the suggested favorites based on selected subject(s), mark it as such
        if (this.props.data.find((x) => x.key === newList[i].key)) {
          newList[i].suggested = true
        }
      }
      this.props.nextStep(newList)
    }
    // Set the search results back to empty
    this.props.searchFavorites(KIND.databases, null)
  }

  skipStep (event) {
    event.preventDefault()
    this.nextStep(event, true)
  }

  render () {
    const hintText = `
      The first four items in this list will be the links that appear for you
      on the library website's home page.`
    return (
      <React.Fragment>
        <div className='modal-body row'>
          <div className='col-xs-12 col-sm-7'>
            <h4 id='favoritesModalDesc'>Recommended databases based on your subject selections.</h4>
            <span className='d-sm-none'>{hintText}</span>
            <div className='row'>
              <FavoritesList kind={KIND.databases} items={this.state.listItems} updateList={this.updateList} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-5'>
            <h4 className='d-xs-none'>Add additional databases.</h4>
            <Search
              kind={KIND.databases}
              placeholder={'Add Databases'}
              buttonText={'Search Databases'}
              existingFavorites={this.state.listItems}
              onAddFavorite={this.onAddFavorite}
            />
            <div className='gap-top d-xs-none'>
              {hintText}
              <br /><br />
              You can rearrange the listing using the
              <img src={moveIcon} alt='☰' style={{ position: 'relative', left: '6px', top: '2px' }} />
            </div>
          </div>
        </div>
        <Footer
          step={this.props.step}
          stepCount={this.props.stepCount}
          nextStep={this.nextStep}
          prevStep={this.props.prevStep}
          skipStep={this.skipStep}
          saving={this.props.saving}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ searchFavorites }, dispatch)
}

DatabaseStep.propTypes = {
  data: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  stepCount: PropTypes.number.isRequired,
  nextStep: PropTypes.func,
  prevStep: PropTypes.func,
  saving: PropTypes.bool,
  searchFavorites: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(DatabaseStep)
