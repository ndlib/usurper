import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import SubjectFacets from 'components/DatabaseList/SubjectFacets'
import Presenter from 'components/DatabaseList/SubjectFacets/presenter.js'
import { KIND } from 'actions/personal/favorites'

let enzymeWrapper
let props

const subject1 = {
  sys: { id: 'bar' },
  linkText: 'A_First record',
}
const subject2 = {
  sys: { id: 'foo' },
  linkText: 'M_Middle 1'
}
const subject3 = {
  sys: { id: 'baz' },
  linkText: 'Z_Last record',
}
const newSubject = {
  sys: { id: 'foobar' },
  linkText: 'M_Middle 2',
}

const setup = (props) => {
  return shallow(<SubjectFacets {...props} />)
}

describe('components/DatabaseList/SubjectFacets', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      subjects: [
        subject2,
        subject1,
        subject3,
        newSubject,
      ],
      activeSubjects: [
        subject1.sys.id,
        subject2.sys.id,
        subject3.sys.id,
      ],
      onSubjectFilterApply: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render a presenter', () => {
    const found = enzymeWrapper.find(Presenter)
    expect(found.exists()).toBe(true)
  })

  it('should sort subjects by linkText', () => {
    const found = enzymeWrapper.find(Presenter)
    expect(found.exists()).toBe(true)
    expect(found.props().subjects).toEqual([
      subject1,
      subject2,
      newSubject,
      subject3,
    ])
  })

  it('should increase result count when calling showMore', () => {
    const beforeCount = enzymeWrapper.state().resultsToShow
    enzymeWrapper.instance().showMore()
    expect(enzymeWrapper.state().resultsToShow).toBeGreaterThan(beforeCount)
  })

  it('should reset selected subjects when active filter list updated', () => {
    enzymeWrapper.setProps({
      activeSubjects: [ newSubject.sys.id ],
    })
    expect(enzymeWrapper.state().selectedSubjects).toEqual([ newSubject ])
  })

  describe('onCheckboxChanged', () => {
    it('should add item when checked', () => {
      const instance = enzymeWrapper.instance()
      instance.onCheckboxChanged({
        target: {
          checked: true,
        },
      }, newSubject)

      expect(enzymeWrapper.state().selectedSubjects).toEqual(expect.arrayContaining([
        subject1,
        subject2,
        subject3,
        newSubject,
      ]))
    })

    it('should remove item when unchecked', () => {
      const instance = enzymeWrapper.instance()
      instance.onCheckboxChanged({
        target: {
          checked: false,
        },
      }, subject2)

      const newValue = enzymeWrapper.state().selectedSubjects
      expect(newValue).not.toEqual(expect.arrayContaining([ subject2 ]))
      expect(newValue).toEqual(expect.arrayContaining([
        subject1,
        subject3,
      ]))
    })
  })

  describe('onSubjectClick', () => {
    it('should add item when not already active', () => {
      const instance = enzymeWrapper.instance()
      instance.onSubjectClick(newSubject)

      expect(enzymeWrapper.state().selectedSubjects).toEqual(expect.arrayContaining([
        subject1,
        subject2,
        subject3,
        newSubject,
      ]))
      expect(props.onSubjectFilterApply).toHaveBeenCalled()
    })

    it('should remove item when already active', () => {
      const instance = enzymeWrapper.instance()
      instance.onSubjectClick(subject2)

      const newValue = enzymeWrapper.state().selectedSubjects
      expect(newValue).not.toEqual(expect.arrayContaining([ subject2 ]))
      expect(newValue).toEqual(expect.arrayContaining([
        subject1,
        subject3,
      ]))
      expect(props.onSubjectFilterApply).toHaveBeenCalled()
    })
  })
})
