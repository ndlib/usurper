import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Hours/Page/presenter'
import CurrentHours from 'components/Hours/Current'
import PageTitle from 'components/Layout/PageTitle'

const setup = (props) => {
  return shallow(
    <Presenter
      servicePoints={props.servicePoints}
      hoursPageOrder={[
        { servicePointSlug: 'hesburghlibrary', main: true },
      ]}
    />
  )
}

let enzymeWrapper
let props

describe('components/Hours/Page/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('with data', () => {
    beforeEach(() => {
      props = {
        servicePoints: {
          hesburghlibrary: {
            fields: {
              address: '1337 Road Rd',
              hoursCode: '12345678',
              type: 'Library',
            },
            sys: {
              id: 'jIPhspahfHdSFHhpcnzxpfajpthAS',
            },
          },
        },
      }

      enzymeWrapper = setup(props)
    })

    it('should add a title to the page', () => {
      expect(enzymeWrapper.find(PageTitle).exists()).toBe(true)
    })

    it('should render CurrentHours component for each servicePoint', () => {
      // Make sure there is at least one entry in the test data or this test is invalid
      const servicePointCount = Object.keys(props.servicePoints).length
      expect(servicePointCount).toBeGreaterThan(0)
      expect(enzymeWrapper.find(CurrentHours)).toHaveLength(servicePointCount)

      Object.keys(props.servicePoints).forEach(spName => {
        const found = enzymeWrapper.findWhere(el => el.type() === CurrentHours && el.props().servicePoint === props.servicePoints[spName])
        expect(found.exists()).toBe(true)
      })
    })
  })

  describe('with invalid data', () => {
    beforeEach(() => {
      props = {
        servicePoints: {
          thisNameDoesNotExist: {
            sys: { id: 'fake' },
          },
        },
      }

      enzymeWrapper = setup(props)
    })

    it('should not render any service points or hours', () => {
      expect(enzymeWrapper.findWhere(el => el.hasClass('main-service-point')).exists()).toBe(false)
      expect(enzymeWrapper.findWhere(el => el.hasClass('sub-service-point')).exists()).toBe(false)
      expect(enzymeWrapper.find(CurrentHours).exists()).toBe(false)
    })
  })
})
