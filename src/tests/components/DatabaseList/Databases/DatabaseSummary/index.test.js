import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary'
import Presenter from 'components/DatabaseList/Databases/DatabaseSummary/presenter.js'
import { KIND } from 'actions/personal/favorites'
import { multidisciplinarySubject } from 'constants/staticData'

let enzymeWrapper
let store

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (state, ownProps) => {
  store = mockStore(state)
  return shallow(<DatabaseSummary store={store} {...ownProps} />)
}

describe('components/DatabaseList/Databases/DatabaseSummary', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    const state = {
      favorites: {
        [KIND.databases]: {
          items: [
            {
              key: 'fhqwhgads_link_0',
              title: 'Come on fhqwhgads',
              url: 'everybody.to/theLimit',
            },
          ],
        },
      },
    }
    const props = {
      item: {
        sys: {
          id: 'fhqwhgads',
        },
        fields: {
          title: 'Come on fhqwhgads',
          urls: [
            {
              url: 'i.said',
              notes: 'come on fhqwhgads',
              title: 'I said, come on fhqwhgads',
            },
            {
              url: 'everybody.to/theLimit',
              notes: 'everybody to the limit',
              title: 'everybody, come on, fhqwhgads',
            },
          ],
          subjects: [],
          multidisciplinary: true,
        },
      },
      onSubjectFilterApply: jest.fn(),
    }
    enzymeWrapper = setup(state, props)
  })

  it('should render a presenter', () => {
    const found = enzymeWrapper.dive().dive().find(Presenter)
    expect(found.exists()).toBe(true)
  })

  it('should apply subject filter when appropriate', () => {
    const dummyId = 'zngodpabgpeujnvbhzouyxcv'
    const presenter = enzymeWrapper.dive().dive().find(Presenter)
    presenter.props().applySubjectFilter(dummyId)
    expect(enzymeWrapper.dive().props().onSubjectFilterApply).toHaveBeenCalledWith('subject', [ dummyId ])
  })

  it('should add multidisciplinarySubject to list of subjects', () => {
    expect(enzymeWrapper.dive().props().item.fields.subjects.some(sub => sub === multidisciplinarySubject))
  })
})
