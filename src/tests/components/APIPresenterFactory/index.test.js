import React from 'react'
import { shallow, configure } from 'enzyme'
import APIPresenterFactory from '../../../components/APIPresenterFactory'
import Image from '../../../components/Image'
import Related from '../../../components/Related'
import * as statuses from '../../../constants/APIStatuses'
import Loading from '../../../components/Messages/Loading'
import NotFound from '../../../components/Messages/NotFound'
import ErrorMessage from '../../../components/Messages/Error'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (presenter, status, presenterProps) => {
  return shallow(<APIPresenterFactory presenter={ presenter } status={ status } props={ presenterProps } />)
}

const myPresenter = jest.fn(_ => null)

let enzymeWrapper
describe('components/APIPresenterFactory', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('on loading', () => {
    beforeEach(() => {
      enzymeWrapper = setup(myPresenter, statuses.FETCHING, {})
    })

    it('should render a loading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Loading/>)).toBe(true)
    })

    it('should not render a not found component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NotFound/>)).toBe(false)
    })

    it('should not render an error component', () => {
      expect(enzymeWrapper.containsMatchingElement(<ErrorMessage/>)).toBe(false)
    })

    it('should not render my presenter', () => {
      expect(myPresenter.mock.calls.length).toBe(0)
    })
  })

  describe('on data not found', () => {
    beforeEach(() => {
      enzymeWrapper = setup(myPresenter, statuses.NOT_FOUND, {})
    })

    it('should not render a loading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Loading/>)).toBe(false)
    })

    it('should render a not found component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NotFound/>)).toBe(true)
    })

    it('should not render an error component', () => {
      expect(enzymeWrapper.containsMatchingElement(<ErrorMessage/>)).toBe(false)
    })

    it('should not render my presenter', () => {
      expect(myPresenter.mock.calls.length).toBe(0)
    })
  })

  describe('on error loading', () => {
    beforeEach(() => {
      enzymeWrapper = setup(myPresenter, statuses.ERROR, {})
    })

    it('should not render a loading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Loading/>)).toBe(false)
    })

    it('should not render a not found component', () => {
      expect(enzymeWrapper.containsMatchingElement(<NotFound/>)).toBe(false)
    })

    it('should render an error component', () => {
      expect(enzymeWrapper.containsMatchingElement(<ErrorMessage/>)).toBe(true)
    })

    it('should not render my presenter', () => {
      expect(myPresenter.mock.calls.length).toBe(0)
    })
  })

  describe('on data found', () => {
    beforeEach(() => {
      enzymeWrapper = setup(myPresenter, statuses.SUCCESS, {})
    })

    it('should render my presenter', () => {
      expect(myPresenter.mock.calls.length).toBe(1)
    })
  })
})
