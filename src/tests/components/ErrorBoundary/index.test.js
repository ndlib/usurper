import React from 'react'
import { shallow, mount } from 'enzyme'
import ErrorBoundary, { withErrorBoundary } from 'components/ErrorBoundary'

const TestComponent = (props) => {
  return <div>{props.testProp}</div>
}

const AlternativeComponent = () => {
  return <div>Alternative</div>
}

const BrokenComponent = () => {
  // do not return anything and throw error
  throw new Error('I AM ERROR')
}

beforeEach(() => {
  // We know there are specific error and logging events associated
  // with the BrokenComponet. We do not want to see them right now.
  jest.spyOn(console, 'error')
  global.console.error.mockImplementation(() => {})
  // jest.spyOn(console, 'log')
  // global.console.log.mockImplementation(() => {})
})

describe('componets/ErrorBoundary/index.js', () => {
  describe('ErrorBoundary component', () => {

    it('renders the child commponent when there is no error', () => {
      let enzymeWrapper = shallow(<ErrorBoundary><div>Some Text</div></ErrorBoundary>)
      expect(enzymeWrapper.containsMatchingElement(<div>Some Text</div>)).toBe(true)

    })

    it('renders a commponent with props when there is no error', () => {
      let enzymeWrapper = shallow(<ErrorBoundary><TestComponent testProp='Some Text'/></ErrorBoundary>).dive(1)
      expect(enzymeWrapper.containsMatchingElement(<div>Some Text</div>)).toBe(true)

    })

    it('renders null when the commponent has an error', () => {
      let enzymeWrapper = mount(<ErrorBoundary><BrokenComponent/></ErrorBoundary>)
      expect(enzymeWrapper.children().length).toBe(0)
    })
  })

  describe('withErrorBoundary higher order component', () => {

    it('renders the commponent when there is no error', () => {
      const WrappedComponent = withErrorBoundary(TestComponent)
      let enzymeWrapper = shallow(<WrappedComponent testProp='Different Text'/>).dive(1)
      expect(enzymeWrapper.containsMatchingElement(<div>Different Text</div>)).toBe(true)
    })

    it('does not render alternative component when a valid component is passed', () => {
      const WrappedComponent = withErrorBoundary(TestComponent, AlternativeComponent)
      let enzymeWrapper = mount(<WrappedComponent testProp='Different Text'/>)
      expect(enzymeWrapper.containsMatchingElement(<div>Different Text</div>)).toBe(true)
      expect(enzymeWrapper.containsMatchingElement(<div>Alternative</div>)).toBe(false)
    })

    it('renders a report feedback button  when the commponent has an error and no alternate component is passed', () => {
      const WrappedComponent = withErrorBoundary(BrokenComponent)
      let enzymeWrapper = mount(<WrappedComponent testProp='Different Text'/>)
      expect(enzymeWrapper.containsMatchingElement(<button>Report feedback</button>)).toBe(true)
    })

    it('renders the alternative component when the commponent has an error', () => {
      const WrappedComponent = withErrorBoundary(BrokenComponent, AlternativeComponent)
      let enzymeWrapper = mount(<WrappedComponent testProp='Different Text'/>)
      expect(enzymeWrapper.containsMatchingElement(<div>Alternative</div>)).toBe(true)
    })
  })

})
