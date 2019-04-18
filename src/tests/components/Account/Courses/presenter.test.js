import React from 'react'
import { shallow } from 'enzyme'
import t from 'typy'
import Courses from 'components/Account/Courses/presenter.js'
import CourseList from 'components/Account/Courses/CourseList'
import StaticBody from 'components/Contentful/StaticContent/Body'

const setup = (props) => {
  return shallow(<Courses {...props} />)
}

let enzymeWrapper
let props
describe('components/Account/Courses/presenter.js', () => {
  describe('with courses', () => {
    beforeEach(() => {
      props = {
        preview: true,
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
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should use preview content', () => {
      expect(enzymeWrapper.containsMatchingElement(<StaticBody slug='courses' preview={props.preview} />)).toBe(true)
    })

    it('should render CourseList components with correct data', () => {
      let timesCalled = 0
      const checkForList = (section, category) => {
        const expectedData = t(props.courses, section + '.' + category).safeObject
        expect(enzymeWrapper.containsMatchingElement(<CourseList courses={expectedData} />)).toBe(true)
        timesCalled++
      }

      checkForList('enrollments', 'current')
      checkForList('enrollments', 'future')
      checkForList('instructs', 'current')
      checkForList('instructs', 'future')

      // ensure there are no extraneous CourseLists that we didn't check for
      expect(enzymeWrapper.find(CourseList)).toHaveLength(timesCalled)

      // invalid test prevention
      expect(timesCalled).toBeGreaterThan(0)
    })

    it('should not render a no classes found message', () => {
      expect(enzymeWrapper.find('.noClasses').exists()).toBe(false)
    })
  })

  describe('without courses', () => {
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

    it('should not render CourseList components', () => {
      expect(enzymeWrapper.find(CourseList).exists()).toBe(false)
    })

    it('should render an appropriate message', () => {
      expect(enzymeWrapper.find('.noClasses').exists()).toBe(true)
    })
  })
})
