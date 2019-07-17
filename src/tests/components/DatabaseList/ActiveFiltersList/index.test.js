import React from 'react'
import { shallow } from 'enzyme'

import ActiveFiltersList from 'components/DatabaseList/ActiveFiltersList'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<ActiveFiltersList {...props} />)
}

describe('components/DatabaseList/ActiveFiltersList', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      subjects: [
        {
          sys: { id: 'music' },
          linkText: 'Music Display Text',
        },
        {
          sys: { id: 'math' },
          linkText: 'Mathematics Display Text',
        }
      ],
      removeSubjectFromFilter: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render UI for each subject', () => {
    expect(props.subjects.length).toBeGreaterThan(0)

    props.subjects.forEach((subject) => {
      const found = enzymeWrapper.findWhere(el => el.hasClass('dbSubject') && el.html().includes(subject.linkText))
      expect(found.exists()).toBe(true)
    })
  })

  it('should remove subject from filter when clicking', () => {
    const found = enzymeWrapper.findWhere(el => el.hasClass('dbSubject') && el.html().includes(props.subjects[0].linkText))
    expect(found.exists()).toBe(true)
    found.simulate('click')

    expect(props.removeSubjectFromFilter).toHaveBeenCalled()
  })
})