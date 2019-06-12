import React from 'react'
import { shallow } from 'enzyme'

import CirculationHistory from 'components/Account/CirculationHistory/presenter'
import CircOptIn from 'components/Account/CirculationHistory/CircOptIn'
import CircHistoryModal from 'components/Account/CirculationHistory/CircHistoryModal'
import CircHistorySidebar from 'components/Account/CirculationHistory/CircHistorySidebar'
import ResourceList from 'components/Account/ResourceList'

import * as statuses from 'constants/APIStatuses'

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
        updateStatus: statuses.NOT_FETCHED,
        updating: false,
        setCircStatus: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ResourceList with items', () => {
      const find = <ResourceList list={props.items} loading={props.loading} type='history' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should not render CircOptIn message', () => {
      expect(enzymeWrapper.find(CircOptIn).exists()).toBe(false)
    })
  })

  describe('while loading', () => {
    beforeEach(() => {
      props = {
        loading: true,
        optedIn: false,
        items: [],
        updateStatus: statuses.NOT_FETCHED,
        updating: false,
        setCircStatus: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ResourceList with items', () => {
      const find = <ResourceList list={props.items} loading={props.loading} type='history' />
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should not render CircOptIn component', () => {
      expect(enzymeWrapper.find(CircOptIn).exists()).toBe(false)
    })
  })

  describe('opted out', () => {
    beforeEach(() => {
      props = {
        loading: false,
        optedIn: false,
        items: [],
        updateStatus: statuses.NOT_FETCHED,
        updating: false,
        setCircStatus: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render CircOptIn component', () => {
      expect(enzymeWrapper.find(CircOptIn).exists()).toBe(true)
    })

    it('should not render a ResourceList', () => {
      expect(enzymeWrapper.find(ResourceList).exists()).toBe(false)
    })

    it('should open modal when openModal called', () => {
      expect(enzymeWrapper.state().modalOpen).toBe(false)

      const instance = enzymeWrapper.instance()
      instance.openModal()
      expect(enzymeWrapper.state().modalOpen).toBe(true)

      expect(enzymeWrapper.containsMatchingElement(
        <CircHistoryModal isOpen optedIn={false} updating={false} onClose={instance.dismiss} onConfirm={instance.confirmToggleStatus} />
      )).toBe(true)
    })

    it('should close modal when finished updating', () => {
      const instance = enzymeWrapper.instance()
      instance.openModal()
      expect(enzymeWrapper.state().modalOpen).toBe(true)

      enzymeWrapper.setProps({
        updating: true,
      })
      enzymeWrapper.setProps({
        updating: false,
      })

      expect(enzymeWrapper.state().modalOpen).toBe(false)
    })

    it('should update opt in status when confirming from modal', () => {
      const instance = enzymeWrapper.instance()
      instance.confirmToggleStatus()

      expect(props.setCircStatus).toHaveBeenCalledWith(true)
    })
  })
})
