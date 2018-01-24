import React from 'react'
import { shallow } from 'enzyme'
import Alert from '../../../components/Contentful/Alert/presenter'
import Link from '../../../components/Link'

const setup = (props) => {
  return shallow(<Alert {...props} ></Alert>);
}

let enzymeWrapper
let props
describe('components/Alert', () => {
  let today = new Date();
  const yesterday = today.setDate(today.getDate() - 1);
  today = new Date();
  const tomorrow = today.setDate(today.getDate() + 1);

  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('global alert(s)', () => {
    beforeEach(() => {
      props = {
        alerts: {
          test_alert: [
            {
              startTime: yesterday,
              endTime: tomorrow,
              url:  'google.com',
              title: 'what went wrong',
              description: 'the sky is falling',
              className: 'alert',
              type: 'test_alert',
            },
            {
              startTime: yesterday,
              endTime: tomorrow,
              url:  'sample.com',
              title: 'what went right',
              description: 'the sun is shining',
              className: 'alert',
              type: 'test_alert',
            },
          ],
        },
      }

      enzymeWrapper = setup(props)
    })

    it('renders global alert(s)', () => {
      const alerts = props.alerts.test_alert
      alerts.forEach((alert) => {
        expect(enzymeWrapper.containsMatchingElement(<Link className='description' to={alert.url}>{alert.description}</Link>)).toBe(true)
      })
    })
  })

  describe('single alert', () => {
    beforeEach(() => {
      props = {
        alerts: {
          test_alerts: [
            {
              startTime: yesterday,
              url:  'google.com',
              title: 'what went wrong',
              description: 'the sky is falling',
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
      expect(enzymeWrapper.containsMatchingElement(<Link to={alert.url}>{alert.description}</Link>)).toBe(true);
    })
  })
})
