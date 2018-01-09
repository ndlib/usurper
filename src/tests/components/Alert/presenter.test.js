import React from 'react'
import { shallow, configure } from 'enzyme'
import Alert from '../../../components/Contentful/Alert/presenter'
import Link from '../../../components/Link'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

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
        globalAlerts: [
          {
            fields: {
              startTime: yesterday,
              endTime: tomorrow,
              url:  'google.com',
              title: 'what went wrong',
              description: 'the sky is falling'
            }
          },
          {
            fields: {
              startTime: yesterday,
              endTime: tomorrow,
              url:  'sample.com',
              title: 'what went right',
              description: 'the sun is shining'
            }
          }
        ]
      }

      enzymeWrapper = setup(props)
    })

    it('renders global alert(s)', () => {
      props.globalAlerts.forEach((entry) => {
        const alert = entry.fields;
        expect(enzymeWrapper.containsMatchingElement(<Link to={alert.url} >{alert.description}</Link>)).toBe(true);
      })
    })
  })

  describe('single alert', () => {
    beforeEach(() => {
      props = {
        alert: {
          fields: {
            startTime: yesterday,
            endTime: tomorrow,
            url:  'google.com',
            title: 'what went wrong',
            description: 'the sky is falling'
          }
        }
      }
      enzymeWrapper = setup(props)
    })

    it('renders single alert', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={props.alert.fields.url} >{props.alert.fields.description}</Link>)).toBe(true);
    })
  })
})
