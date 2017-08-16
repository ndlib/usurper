import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import { shallow } from 'enzyme'
import Courses from '../../../components/Courses/presenter.js'
import StaticBody from '../../../components/Contentful/StaticContent/Body'
import Lgicon from '../../../static/images/icons/libguide.png'
import Link from '../../../components/Link'

const setup = (props) => {
  return shallow(<Courses {...props} />)
}

let enzymeWrapper
let props
describe('components/Courses/presenter.js', () => {
  describe('enrollmentCard(course) test', () => {
    beforeEach(() => {
      props = {
        preview: true,
        courses: {
          courses: {
            enrollments: {
              current: [{
                type: 'section',
                courseReserveLink: 'foo',
                courseGuide: 'bar',
                codes: ['27800'],
                sectionNumbers: ['48'],
                pathfinder: {
                  url: 'bar',
                  title: 'test',
                },
                instructor_name: 'Jim',
                id: '201620-24315',
                title: 'Research Lab',
              }],
              future: [{
                type: 'section',
                courseReserveLink: 'foo2',
                courseGuide: 'bar2',
                codes: ['29999'],
                sectionNumbers: ['34'],
                pathfinder: {
                  url: 'bar2',
                  title: 'test2',
                },
                instructor_name: 'Jeff',
                id: '201620-34566',
                title: 'Research Lab',
              }],
            },
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should use preview content', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<StaticBody slug='courses' preview={props.preview} />))
        .toBe(true)
    })

    it('should have courseReserves link for current enrollments', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<a href={props.courses.courses.enrollments.current[0].courseReservesLink}>Course Reserves</a>))
        .toBe(true)
    })

    it('should have a course subtitle for current enrollments', () => {
      let subtitle = props.courses.courses.enrollments.current[0].codes.join(', ') + ' - ' + props.courses.courses.enrollments.current[0].sectionNumbers.join(', ')
      expect(enzymeWrapper
      .containsMatchingElement(<small>{subtitle}</small>)).toBe(true)
    })

    it('should have a pathfinder link for current enrollments', () => {
      let url = props.courses.courses.enrollments.current[0].pathfinder.url
      let title = props.courses.courses.enrollments.current[0].pathfinder.title
      expect(enzymeWrapper
      .containsMatchingElement(<Link to={url}>{title} Resources</Link>)).toBe(true)
    })

    it('should have courseReserves link for future enrollments', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<a href={props.courses.courses.enrollments.future[0].courseReservesLink}>Course Reserves</a>))
        .toBe(true)
    })

    it('should have a course subtitle for future enrollments', () => {
      let subtitle = props.courses.courses.enrollments.future[0].codes.join(', ') + ' - ' + props.courses.courses.enrollments.future[0].sectionNumbers.join(', ')
      expect(enzymeWrapper
      .containsMatchingElement(<small>{subtitle}</small>)).toBe(true)
    })

    it('should have a pathfinder link for future enrollments', () => {
      let url = props.courses.courses.enrollments.future[0].pathfinder.url
      let title = props.courses.courses.enrollments.future[0].pathfinder.title
      expect(enzymeWrapper
      .containsMatchingElement(<Link to={url}>{title} Resources</Link>)).toBe(true)
    })
  })

  describe('InstructCard(course) test', () => {
    beforeEach(() => {
      props = {
        preview: false,
        courses: {
          courses: {
            instructs: {
              current: [{
                type: 'instructor',
                courseReserveLink: 'foo',
                courseGuides: ['bar'],
                codes: ['27800'],
                sectionNumbers: ['48'],
                pathfinders: [
                 {
                    url: 'bar',
                    title: 'test',
                  },
                ],
                instructor_name: 'Jim',
                id: '201620-24315',
                title: 'Research Lab',
              }],
              future: [{
                type: 'instructor',
                courseReserveLink: 'foo2',
                courseGuides: ['bar2'],
                codes: ['29999'],
                sectionNumbers: ['34'],
                pathfinders: [
                  {
                    url: 'bar2',
                    title: 'test2',
                  },
                ],
                instructor_name: 'Jeff',
                id: '201620-34566',
                title: 'Research Lab',
              }],
            },
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not use preview content', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<StaticBody slug='courses' preview={props.preview} />))
        .toBe(true)
    })

    it('should have courseReserves link for current instructs', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<a href={props.courses.courses.instructs.current[0].courseReservesLink}>Course Reserves</a>))
        .toBe(true)
    })

    it('should have a course subtitle for current instructs', () => {
      let subtitle = props.courses.courses.instructs.current[0].codes.join(', ') + ' - ' + props.courses.courses.instructs.current[0].sectionNumbers.join(', ')
      expect(enzymeWrapper
      .containsMatchingElement(<small>{subtitle}</small>)).toBe(true)
    })

    it('should have a pathfinder link for current instructs', () => {
      let url = props.courses.courses.instructs.current[0].pathfinders[0].url
      let title = props.courses.courses.instructs.current[0].pathfinders[0].title
      expect(enzymeWrapper
      .containsMatchingElement(<Link to={url}>{title} Resources</Link>)).toBe(true)
    })

    it('should have courseReserves link for future instructs', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<a href={props.courses.courses.instructs.future[0].courseReservesLink}>Course Reserves</a>))
        .toBe(true)
    })

    it('should have a course subtitle for future instructs', () => {
      let subtitle = props.courses.courses.instructs.future[0].codes.join(', ') + ' - ' + props.courses.courses.instructs.future[0].sectionNumbers.join(', ')
      expect(enzymeWrapper
      .containsMatchingElement(<small>{subtitle}</small>)).toBe(true)
    })

    it('should have a pathfinder link for future instructs', () => {
      let url = props.courses.courses.instructs.future[0].pathfinders[0].url
      let title = props.courses.courses.instructs.future[0].pathfinders[0].title
      expect(enzymeWrapper
      .containsMatchingElement(<Link to={url}>{title} Resources</Link>)).toBe(true)
    })
  })

  describe('Incorrect data test - props.courses.courses = undefined', () => {
    beforeEach(() => {
      props = {
        preview: false,
        courses: {
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not have classes to display', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<p>No Classes to display for the current semester</p>))
        .toBe(true)
    })
  })

  describe('Incorrect data test - props.courses.courses.enrollments/instructs = undefined', () => {
    beforeEach(() => {
      props = {
        preview: false,
        courses: {
          courses: {
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should not have classes to display', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<p className='noClasses'>
          No Classes to display for the current semester.
        </p>))
        .toBe(true)
    })
  })
})
