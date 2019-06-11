import React from 'react'
import { shallow } from 'enzyme'
import ReactModal from 'react-modal'

import CircHistoryModal from 'components/Account/CirculationHistory/CircHistoryModal'
import OptInModalBody from 'components/Account/CirculationHistory/CircHistoryModal/OptInModalBody'
import OptOutModalBody from 'components/Account/CirculationHistory/CircHistoryModal/OptOutModalBody'

let enzymeWrapper

const setup = (props) => {
  return shallow(<CircHistoryModal {...props} />)
}

describe('components/Account/CirculationHistory/CircHistoryModal', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('opting in confirmation', () => {
    beforeEach(() => {
      const props = {
        isOpen: true,
        optedIn: false,
        updating: false,
        onClose: jest.fn(),
        onConfirm: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ReactModal', () => {
      expect(enzymeWrapper.find(ReactModal).exists()).toBe(true)
    })

    it('should render appropriate body component', () => {
      expect(enzymeWrapper.find(OptInModalBody).exists()).toBe(true)
    })
  })

  describe('opting out confirmation', () => {
    beforeEach(() => {
      const props = {
        isOpen: true,
        optedIn: true,
        updating: false,
        onClose: jest.fn(),
        onConfirm: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a ReactModal', () => {
      expect(enzymeWrapper.find(ReactModal).exists()).toBe(true)
    })

    it('should render appropriate body component', () => {
      expect(enzymeWrapper.find(OptOutModalBody).exists()).toBe(true)
    })
  })
})