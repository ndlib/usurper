import React from 'react'
import { shallow } from 'enzyme'
import SubjectFacets from 'components/DatabaseList/SubjectFacets/presenter.js'
import Accordion from 'components/Interactive/Accordion'

const setup = (props) => {
  return shallow(<SubjectFacets {...props} />)
}

const validSubjects = [
  {
    sys: { id: 'subject1' },
    linkText: 'Display Text 1',
  },
  {
    sys: { id: 'subject2' },
    linkText: 'Display Text 2',
  },
  {
    sys: { id: 'subject3' },
    linkText: 'Display Text 3',
  },
  {
    sys: { id: 'SELECT_ME' },
    linkText: 'Selected subject',
  },
  {
    sys: { id: 'ACTIVATE' },
    linkText: 'Active subject',
  }
]

let props
let enzymeWrapper
describe('components/DatabaseList/SubjectFacets/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    props = {
      resultsToShow: 2,
      subjects: validSubjects,
      selectedSubjects: [
        validSubjects[3],
      ],
      activeSubjects: [
        validSubjects[4].sys.id,
      ],
      showMore: jest.fn(),
      applyFilter: jest.fn(),
      onSubjectClick: jest.fn(),
      onCheckboxChanged: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  it('should render a mobile-only Accordion component', () => {
    const found = enzymeWrapper.find(Accordion)
    expect(found.exists()).toBe(true)
    expect(found.props().mobileOnly).toBe(true)
  })

  it('should limit subjects shown based on props', () => {
    // Also make sure subjects in the applied filter are displayed no matter what
    const expectedSubjects = props.subjects.slice(0, props.resultsToShow).concat([
      validSubjects[4],
    ])
    expectedSubjects.forEach(subject => {
      expect(enzymeWrapper.containsMatchingElement(<span>{subject.linkText}</span>)).toBe(true)
    })
  })

  it('should call onSubjectClick when clicking individual subject', () => {
    const found = enzymeWrapper.findWhere(el => el.hasClass('subjectLink'))
    found.first().simulate('click')
    expect(props.onSubjectClick).toHaveBeenCalled()
  })

  it('should call onCheckboxChanged when clicking subject checkbox', () => {
    const found = enzymeWrapper.findWhere(el => el.type() === 'input' && el.props().type === 'checkbox')
    found.first().simulate('change')
    expect(props.onCheckboxChanged).toHaveBeenCalled()
  })

  it('should call applyFilter when clicking appropriate button', () => {
    const btn = enzymeWrapper.findWhere(el => el.hasClass('applySubjectFilter'))
    btn.simulate('click')
    expect(props.applyFilter).toHaveBeenCalled()
  })

  it('should call applyFilter with empty array when clicking clear button', () => {
    const btn = enzymeWrapper.findWhere(el => el.hasClass('clearSubjectFilter'))
    btn.simulate('click')
    expect(props.applyFilter).toHaveBeenCalledWith([])
  })
})
