import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'
import { ContentfulFloorContainer } from '../../../../components/Contentful/Floor'
import FloorPresenter from '../../../../components/Contentful/Floor/presenter'
import APIPresenterFactory from '../../../../components/APIPresenterFactory'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  const store = configureStore()(props)
  return shallow(<ContentfulFloorContainer {...props} />, { lifecycleExperimental: true })
}

let enzymeWrapper
let props
describe('components/Contentful/Floor/Container', () => {
  beforeEach(() => {
    props = {
      cfFloorEntry: { status: 'test' },
      fetchFloor: jest.fn(),
      match: { params: { id: 'fake page slug' } },
      personal: {
        login: {},
        loggedIn: true,
        label: 'label',
      },
      search: {
        drawerOpen: false,
        hasPref: false,
        usePref: false,
        searchType: 'FAKE_TYPE',
      },
      menus: {},
      location: { search: null },
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('only renders APIPresenterFactory with cfFloorEntry slice and FloorPresenter', () => {
    expect(enzymeWrapper.containsMatchingElement(<APIPresenterFactory
      status={props.cfFloorEntry.status}
      props={{ cfFloorEntry: props.cfFloorEntry.json }}
      presenter={FloorPresenter} />))
      .toBe(true)
  })

  it('calls the bound fetch page action on load', () => {
    expect(props.fetchFloor.mock.calls.length).toBe(1)
  })
})
