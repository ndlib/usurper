import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Lgicon from '../../static/images/icons/libguide.png'

class Courses extends Component {
  constructor (props, context) {
    super(props, context)
    this.courses = {
      enrollments: {
        current: [
          {
            id: 'BIO 101',
            title: 'What is Biology',
            subjectGuide: 'http://libguides.library.nd.edu/biology',
            reserves: false,
          },
          {
            id: 'W&R 13300',
            title: 'Creating and Analyzing Manifestos',
            courseGuide: 'http://libguides.library.nd.edu/manifesto',
            reserves: true,
          },
        ],
        future: [
          {
            id: 'THEO 33970',
            title: 'Global Issues',
            courseGuide: 'http://libguides.library.nd.edu/global-issues-israel-palestine',
            reserves: true,
          },
        ],
      },
      instructs: {
        current: [
          {
            id: 'EE 404',
            title: 'Engineering and You',
            subjectGuide: 'http://libguides.library.nd.edu/ElectricalEngineering',
            reserves: true,
          },
        ],
        future: [
          {
            id: 'ARCH 40312',
            title: 'Social Factors & Sustainability',
            courseGuide: 'http://libguides.library.nd.edu/social-factors-sustainability',
            reserves: false,
          },
        ],
      },
    }
  }

  componentDidMount () {
    if (!this.props.linkOnly) {
      document.title = 'Courses | Hesburgh Library'
    }
  }

  courseCard (course, showInstructors = true) {
    var guideURL = course.courseGuide ? course.courseGuide : course.subjectGuide
    var reserves = null
    if (course.reserves) {
      reserves = <a href='https://reserves.library.nd.edu'>Reserves</a>
    }

    return (
      <div className='course-card' key={course.id}>
        <div className='course'>
          <p className='course-header'>{course.title}</p>
          <small className='course-subtitle'>{course.id}</small>
        </div>
        <div className='course-guides'>
          <a href={guideURL}><img src={Lgicon} /> LibGuide</a>
        </div>
        <div className='course-reserves'>
          {reserves}
        </div>
      </div>
    )
  }

  cardsForArray (outArray, array, key, name, showInstructors = true) {
    var cards = []
    if (array && array.length > 0) {
      for (var i in array) {
        cards.push(
          this.courseCard(array[i], showInstructors)
        )
      }

      outArray.push(
        <div className='course-section' key={key + '-section'}>
          <h3 className='course-title' key={key}>{name}</h3>
          {cards}
        </div>
      )
    }
  }

  courseCards () {
    var courses = this.courses
    var out = []
    if (!courses) {
      return out
    }
    if (courses.enrollments) {
      this.cardsForArray(out, courses.enrollments.current, 'enrollment-current', 'Current Enrollments')
      this.cardsForArray(out, courses.enrollments.future, 'enrollment-future', 'Future Enrollments')
    }
    if (courses.instructs) {
      this.cardsForArray(out, courses.instructs.current, 'instruct-current', 'Current Instructs', false)
      this.cardsForArray(out, courses.instructs.future, 'instruct-future', 'Future Instructs', false)
    }
    return out
  }

  render () {
    if (this.props.linkOnly) {
      return (
        <Link to='/courses'>My Courses</Link>
      )
    }
    return (
      <div key='courses' className='content'>
        <Link to='/personal' className='button fright'>My Items</Link>
        <div className='alert'>
          <p><strong>Attention:</strong> Courses listed below are for demonstration purposes only.</p>
        </div>
        <div key='courseCards'>
          { this.courseCards() }
        </div>
      </div>
    )
  }
}

Courses.propTypes = {
  linkOnly: PropTypes.bool,
}

Courses.contextTypes = {
  router: PropTypes.object,
}

export default Courses
