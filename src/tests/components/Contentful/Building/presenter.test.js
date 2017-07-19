import React from 'react'
import { shallow } from 'enzyme'
import BuildingPresenter from '../../../../components/Contentful/Building'
import Image from '../../../../components/Image'
import Link from '../../../../components/Link'
import Related from '../../../../components/Related'
import * as statuses from '../../../../constants/APIStatuses'
import Loading from '../../../../components/Messages/Loading'
import NotFound from '../../../../components/Messages/NotFound'
import ErrorMessage from '../../../../components/Messages/Error'

const setup = (cfBuildingEntry) => {
  const props = { cfBuildingEntry }
  return shallow(<BuildingPresenter {...props} />)
}

let enzymeWrapper
describe('components/Contentful/Building', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  beforeEach(() => {
    enzymeWrapper = setup({
      fields: {
        title: 'Fake Title',
        shortDescription: 'Fake short description',
        content: 'Fake content',
        image: 'Fake image',
        mapLink: 'Fake map link',
      },
      sys: { id: 'FakeId' }
    })
  })

  it('should render a top level div with correct key', () => {
    expect(enzymeWrapper.key() === 'ContentfulBuilding_FakeId').toBe(true)
  })

  it('should renders the title of the content', () => {
    expect(enzymeWrapper.containsMatchingElement(<h3>Fake Title</h3>)).toBe(true)
  })

  it('should render Image for image', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={ 'Fake image' } />)).toBe(true)
  })

  it('should render a link to the map', () => {
    expect(enzymeWrapper.findWhere(n => n.type() === Link && n.props().to === 'Fake map link').exists()).toBe(true)
  })
})
