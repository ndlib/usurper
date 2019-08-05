import React from 'react'
import { mount } from 'enzyme'
import Alert from 'components/Contentful/Alert/presenter'
import LibMarkdown from 'components/LibMarkdown'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'

const setup = (props) => {
  const store = configureStore()(props)
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <Alert {...props} ></Alert>
      </MemoryRouter>
    </Provider>
  );
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
              title: 'what went wrong',
              description: '[the sky is falling](google.com)',
              className: 'alert',
              type: 'test_alert',
            },
            {
              startTime: yesterday,
              endTime: tomorrow,
              title: 'what went right',
              description: '[the sun is shining](sample.com)',
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
        expect(enzymeWrapper.containsMatchingElement(<LibMarkdown className='description'>{alert.description}</LibMarkdown>)).toBe(true)
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
