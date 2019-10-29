import React from 'react'
import { shallow } from 'enzyme'

import ActiveFiltersList from 'components/DatabaseList/ActiveFiltersList'
import Tags from 'components/Interactive/Tags'

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
      letter: 's',
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
      removeLetterFilter: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render removable tags', () => {
    const found = enzymeWrapper.find(Tags)
    expect(found.exists()).toBe(true)
    expect(found.props().hasRemove).toBe(true)
  })
})