import React from 'react'
import { shallow } from 'enzyme'

import CirculationHistory from 'components/Account/CirculationHistory/presenter'
import OptedOut from 'components/Account/CirculationHistory/OptedOut'
import ResourceList from 'components/Account/ResourceList'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CirculationHistory {...props} />)
}

describe('components/Account/CirculationHistory/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('opted in', () => {
    beforeEach(() => {
      props = {
        loading: false,
        optedIn: true,
        items: ['item 1', 'item 2'],
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ResourceList with items', () => {
      const find = <ResourceList list={props.items} loading={props.loading} type='history' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should not render OptedOut message', () => {
      expect(enzymeWrapper.find(OptedOut).exists()).toBe(false)
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        loading: true,
        optedIn: false,
        items: [],
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ResourceList with items', () => {
      const find = <ResourceList list={props.items} loading={props.loading} type='history' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should not render OptedOut message', () => {
      expect(enzymeWrapper.find(OptedOut).exists()).toBe(false)
    })
  })

  describe('opted out', () => {
    beforeEach(() => {
      props = {
        loading: false,
        optedIn: false,
        items: [],
      }
      enzymeWrapper = setup(props)
    })

    it('should render OptedOut message', () => {
      expect(enzymeWrapper.find(OptedOut).exists()).toBe(true)
    })

    it('should not render a ResourceList', () => {
      expect(enzymeWrapper.find(ResourceList).exists()).toBe(false)
    })
  })
})
