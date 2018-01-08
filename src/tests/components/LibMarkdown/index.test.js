import React from 'react'
import Markdown from 'markdown-to-jsx'
import { shallow, configure } from 'enzyme'
import LibMarkdown from '../../../components/LibMarkdown'
import Link from '../../../components/Link'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (props) => {
  return shallow(<LibMarkdown {...props} ></LibMarkdown>);
}

let enzymeWrapper
let props
describe('LibMarkdown test', () => {
  beforeEach(() => {
    props = {
      id: 'bar',
      className: 'sample',
      itemProp: 'test',
      children: '[SAMPLE](google.com)',
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('renders Markdown', () => {
    expect(enzymeWrapper.find('.sample')).toHaveLength(1);
    expect(enzymeWrapper.containsMatchingElement(<Markdown >{props.children}</Markdown>)).toBe(true);
  })
})
