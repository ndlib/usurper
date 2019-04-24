import React from 'react'
import { shallow } from 'enzyme'
import CourseList from 'components/Account/Courses/CourseList'
import CourseCard from 'components/Account/Courses/CourseList/CourseCard'

const setup = (props) => {
  return shallow(<CourseList {...props} />)
}

let enzymeWrapper
let props
describe('components/Account/Courses/CourseList', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with course data', () => {
    beforeEach(() => {
      props = {
        title: 'There Be Some Courses Here',
        courses: [
          {
            id: '201620-24315',
            title: 'Research Lab',
          },
          {
            id: '201620-34566',
            title: 'Whatever',
          }
        ],
      }
      enzymeWrapper = setup(props)
    })

    it('should display correct title', () => {
      const titleElement = enzymeWrapper.find('.courseSectionTitle')
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.text()).toEqual(props.title)
    })

    it('should render a CourseCard for each course', () => {
      expect(enzymeWrapper.find(CourseCard)).toHaveLength(props.courses.length)
      props.courses.forEach((course) => {
        expect(enzymeWrapper.containsMatchingElement(<CourseCard key={course.id} course={course} />)).toBe(true)
      })
    })
  })

  describe('with no courses', () => {
    beforeEach(() => {
      props = {
        title: 'No courses, man!',
        courses: [],
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.type()).toEqual(null)
    })
  })
})
