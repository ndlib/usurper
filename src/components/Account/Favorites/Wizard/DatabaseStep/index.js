import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FavoritesList from '../../FavoritesList'
import Search from '../../Search'
import Footer from '../Footer'

import { searchFavorites, KIND } from 'actions/personal/favorites'

import moveIcon from 'static/images/move.png'
import styles from '../../style.module.css'

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
    const hintText = (
      <React.Fragment>
        Your top four items will be displayed on the home page while you are logged in.
        <br /><br />
        You can rearrange the listing using the
        <img src={moveIcon} alt='☰' aria-label='grid icon' className={styles.moveIcon} />
      </React.Fragment>
    )
    const descText = this.props.didSelectSubjects
      ? 'Recommended databases based on your subject selections.'
      : `You have not selected any subjects. You can start with
        the following interdisciplinary databases or select databases using the search box on the right.`

    return (
      <React.Fragment>
        <div className='modal-body row'>
          <div className='col-xs-12 col-sm-7'>
            <span id='favoritesModalDesc'>{descText}</span>
            <div className='d-sm-none'>
              <br />
              <span>{hintText}</span>
            </div>
            <div className='row'>
              <FavoritesList kind={KIND.databases} items={this.state.listItems} updateList={this.updateList} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-5'>
            <span className='d-xs-none'>Add additional databases.</span>
            <Search
              kind={KIND.databases}
              placeholder='Search for databases by title'
              buttonText='Search'
              existingFavorites={this.state.listItems}
              onAddFavorite={this.onAddFavorite}
            />
            <div className='gap-top d-xs-none'>
              {hintText}
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
  didSelectSubjects: PropTypes.bool,
  searchFavorites: PropTypes.func,
}

export default connect(null, mapDispatchToProps)(DatabaseStep)
