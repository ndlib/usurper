import React from 'react'
import { shallow } from 'enzyme'

import { FloorSearchEmptyContainer, mapStateToProps, mapDispatchToProps } from 'components/FloorSearch/Empty'
import Presenter from 'components/FloorSearch/Empty/presenter'
import PresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<FloorSearchEmptyContainer {...props} />)
}

describe('components/FloorSearch/Empty', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('before loading', () => {
    beforeEach(() => {
      props = {
        servicePointsStatus: statuses.NOT_FETCHED,
        points: [],
        location: {
          search: '?foo=bar',
        },
        fetchServicePoints: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should call action fetch service points', () => {
      expect(props.fetchServicePoints).toHaveBeenCalled()
    })

    it('should render PresenterFactory with correct presenter', () => {
      expect(enzymeWrapper.containsMatchingElement(<PresenterFactory presenter={Presenter} />)).toBe(true)
    })
  })

  describe('after loading', () => {
    beforeEach(() => {
      props = {
        servicePointsStatus: statuses.SUCCESS,
        points: [
          {
            item: 1,
          },
          {
            item: 2,
          },
        ],
        location: {
          search: '?foo=bar',
        },
        fetchServicePoints: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not call to fetch service points', () => {
      expect(props.fetchServicePoints).not.toHaveBeenCalled()
    })

    it('should render PresenterFactory with service points from props', () => {
      const found = enzymeWrapper.find(PresenterFactory)
      expect(found.exists()).toBe(true)
      expect(found.props().props.points).toEqual(props.points)
    })
  })

  describe('mapStateToProps', () => {
    it('should return no service points while loading', () => {
      const state = {
        cfServicePoints: {
          status: statuses.FETCHING,
        },
      }
      const response = mapStateToProps(state)
      expect(response).toMatchObject({
        servicePointsStatus: statuses.FETCHING,
        points: [],
      })
    })

    it('should return only circulation desk service point after loading', () => {
      const circDeskSp = {
        sys: { id: 1 },
        fields: {
          title: 'Circulation Desk',
          slug: 'circulationservicedesk',
        },
      }
      const state = {
        cfServicePoints: {
          status: statuses.SUCCESS,
          json: [
            circDeskSp,
            {
              sys: { id: 333 },
              fields: {
                title: 'Fake Service Point',
                slug: 'faker',
              },
            },
          ],
        },
      }
      const response = mapStateToProps(state)
      expect(response).toMatchObject({
        servicePointsStatus: statuses.SUCCESS,
        points: [circDeskSp],
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.fetchServicePoints).toEqual(expect.any(Function))
    })
  })
})
