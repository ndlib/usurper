import React from 'react'
import { mount, shallow } from 'enzyme'
import Alert from 'components/Contentful/Alert/presenter'
import LibMarkdown from 'components/LibMarkdown'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  return shallow(<Alert {...props} />)
}

let enzymeWrapper
let props
describe('components/Alert/presenter', () => {
  const today = new Date()
  const yesterday = new Date(new Date(today).setDate(today.getDate() - 1))
  const tomorrow = new Date(new Date(today).setDate(today.getDate() + 1))

  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('global alert(s)', () => {
    beforeEach(() => {
      props = {
        alerts: {
          test_alert: [
            {
              id: 'one',
              startTime: yesterday,
              endTime: tomorrow,
              title: 'what went wrong',
              description: '[the sky is falling](google.com)',
              className: 'alert',
              type: 'test_alert',
            },
            {
              id: 'two',
              startTime: yesterday,
              endTime: tomorrow,
              title: 'what went right',
              description: '[the sun is shining](sample.com)',
              className: 'alert',
              type: 'test_alert',
            },
            {
              id: 'hide_me',
              startTime: yesterday,
              endTime: tomorrow,
              title: 'I am vampire',
              description: 'I hide from the sun',
              className: 'alert',
              type: 'test_alert',
            }
          ],
        },
        hiddenIds: ['hide_me'],
        clearHiddenAlerts: jest.fn(),
        hideAlert: jest.fn(),
      }

      enzymeWrapper = setup(props)
    })

    it('renders global alerts', () => {
      const alerts = props.alerts.test_alert.filter(alert => !props.hiddenIds.includes(alert.id))
      alerts.forEach((alert) => {
        expect(enzymeWrapper.containsMatchingElement(<LibMarkdown className='description'>{alert.description}</LibMarkdown>)).toBe(true)
      })
    })

    it('does not render hidden alert', () => {
      const alerts = props.alerts.test_alert.filter(alert => props.hiddenIds.includes(alert.id))
      alerts.forEach((alert) => {
        expect(enzymeWrapper.containsMatchingElement(<LibMarkdown className='description'>{alert.description}</LibMarkdown>)).toBe(false)
      })
      expect(alerts.length).toBeGreaterThan(0)
    })

    it('should render button to hide alerts', () => {
      const visibleAlerts = props.alerts.test_alert.filter(alert => !props.hiddenIds.includes(alert.id))
      const hideButtons = enzymeWrapper.findWhere(el => el.type() && el.text() === 'Hide Alert')
      expect(hideButtons).toHaveLength(visibleAlerts.length)

      // Make sure function is called when clicking it
      hideButtons.first().simulate('click')
      expect(props.hideAlert).toHaveBeenCalled()
    })

    it('should render button to show hidden alerts', () => {
      const btn = enzymeWrapper.findWhere(el => el.props().onClick === props.clearHiddenAlerts)
      expect(btn.exists()).toBe(true)

      btn.simulate('click')
      expect(props.clearHiddenAlerts).toHaveBeenCalled()
    })

    describe('with none hidden', () => {
      beforeEach(() => {
        props = {
          ...props,
          hiddenIds: [],
        }
        enzymeWrapper = setup(props)
      })

      it('should not render button to show hidden alerts', () => {
        const btn = enzymeWrapper.findWhere(el => el.props().onClick === props.clearHiddenAlerts)
        expect(btn.exists()).toBe(false)
      })
    })
  })

  describe('single alert', () => {
    beforeEach(() => {
      props = {
        alerts: {
          test_alerts: [
            {
              id: 'something',
              startTime: yesterday,
              title: 'what went wrong',
              description: '[the sky is falling](google.com)',
              className: 'alert',
              type: 'test_alert',
            },
          ],
        },
      }
      enzymeWrapper = setup(props)
    })

    it('renders single alert', () => {
      const alert = props.alerts.test_alerts[0]
      expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>{alert.description}</LibMarkdown>)).toBe(true);
    })
  })
})
