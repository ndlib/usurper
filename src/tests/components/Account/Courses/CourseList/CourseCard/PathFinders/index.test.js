import React from 'react'
import { shallow } from 'enzyme'
import PathFinders from 'components/Account/Courses/CourseList/CourseCard/PathFinders'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<PathFinders {...props} />)
}

let enzymeWrapper
let props
describe('components/Account/Courses/CourseList/CourseCard/PathFinders', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with pathfinders array', () => {
    describe('with data', () => {
      beforeEach(() => {
        props = {
            data: [
            {
              url: 'foo',
              title: 'bar',
            },
            {
              url: 'baz',
              title: 'foobar',
            },
          ],
        }
        enzymeWrapper = setup(props)
      })

      it('should link to each item in props', () => {
        props.data.forEach((item) => {
          const have = <Link to={item.url}>{expect.any(String)}</Link>
          expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
        })
      })
    })

    describe('with no data', () => {
      beforeEach(() => {
        props = {
          data: [],
        }
        enzymeWrapper = setup(props)
      })

      it('should not render anything', () => {
        expect(enzymeWrapper.type()).toBe(null)
      })
    })
  })
})
