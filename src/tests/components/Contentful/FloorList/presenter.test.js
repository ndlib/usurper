import React from 'react'
import { shallow } from 'enzyme'
import FloorsPresenter from 'components/Contentful/FloorList/presenter'
import PageTitle from 'components/Layout/PageTitle'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import FloorsTable from 'components/Contentful/FloorList/FloorsTable'

const setup = (props) => {
  return shallow(<FloorsPresenter {...props} />)
}

let enzymeWrapper
describe('components/Contentful/FloorList/presenter', () => {
  beforeEach(() => {
    enzymeWrapper = setup({
      pathSlug: 'fakeSlug',
      title: 'fake title',
      preview: true,
      floorData: ['1', '2', '3', '4'],
    })
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render the title of the content', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title='fake title' />)).toBe(true)
  })

  it('should render the sidebar component', () => {
    expect(enzymeWrapper.containsMatchingElement(<StaticSidebar slug='fakeSlug' preview={true} />)).toBe(true)
  })

  it('should render the FloorsTable component', () => {
    expect(enzymeWrapper.containsMatchingElement(<FloorsTable floorData={['1', '2', '3', '4']} />)).toBe(true)
  })

  it('should render the StaticAlert component', () => {
    const found = enzymeWrapper.find(StaticAlert)
    expect(found.exists()).toBe(true)
    expect(found.props().slug).toEqual('fakeSlug')
  })
})