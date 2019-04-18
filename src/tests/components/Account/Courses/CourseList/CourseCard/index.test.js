import React from 'react'
import { shallow } from 'enzyme'
import CourseCard from 'components/Account/Courses/CourseList/CourseCard'
import PathFinders from 'components/Account/Courses/CourseList/CourseCard/PathFinders'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<CourseCard {...props} />)
}

let enzymeWrapper
let props
describe('components/Account/Courses/CourseList/CourseCard', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with good data', () => {
    beforeEach(() => {
      props = {
        course: {
          type: 'section',
          courseReserveLink: 'foo',
          courseGuide: 'bar',
          codes: ['27800', '27801'],
          sectionNumbers: ['445', '936'],
          pathfinder: {
            url: 'bar',
            title: 'test',
          },
          instructor_name: 'Jim',
          id: '201620-24315',
          title: 'Research Lab',
        }
      }
      enzymeWrapper = setup(props)
    })

    it('should display title correctly', () => {
      const titleElement = enzymeWrapper.find('.courseName')
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.text()).toEqual(props.course.title)
    })

    it('should link to course reserves', () => {
      const have = <Link to={props.course.courseReserveLink}>{expect.any(String)}</Link>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should include subtitle with course codes and section numbers', () => {
      const subtitleElement = enzymeWrapper.find('.courseSubtitle')
      expect(subtitleElement.exists()).toBe(true)
      props.course.codes.forEach((code) => {
        expect(subtitleElement.text()).toMatch(code)
      })
      props.course.sectionNumbers.forEach((num) => {
        expect(subtitleElement.text()).toMatch(num)
      })
    })

    it('should create pathfinder', () => {
      const have = <PathFinders data={[props.course.pathfinder]} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('with no codes', () => {
    beforeEach(() => {
      props = {
        course: {
          instructor_name: 'Bob Newheart', // Yes, I know it's misspelled. This is a different person. :)
        }
      }
      enzymeWrapper = setup(props)
    })

    it('should include subtitle with instructor_name', () => {
      const subtitleElement = enzymeWrapper.find('.courseSubtitle')
      expect(subtitleElement.exists()).toBe(true)
      expect(subtitleElement.text()).toEqual(props.course.instructor_name)
    })
  })

  describe('with pathfinders array', () => {
    beforeEach(() => {
      props = {
        course: {
          pathfinders: [
            {
              url: 'foo',
              title: 'bar',
            },
            {
              url: 'baz',
              title: 'foobar',
            },
          ],
          pathfinder: {
            url: 'ignored',
            title: 'should not be found',
          },
        }
      }
      enzymeWrapper = setup(props)
    })

    it('should create pathfinders with correct data', () => {
      const have = <PathFinders data={props.course.pathfinders} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })
})
