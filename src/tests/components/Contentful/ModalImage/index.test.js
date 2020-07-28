import React from 'react'
import { shallow } from 'enzyme'
import Image from 'components/Image'
import ReactModal from 'react-modal'
import ModalImage from 'components/Contentful/ModalImage'

let enzymeWrapper
let props

describe('components/Contentful/ModalImage', () => {
  beforeEach(() => {
    props = {
      photo: {},
      title: 'fake title',
      altText: 'fake alt text',
    }
    enzymeWrapper = shallow(<ModalImage {...props} />)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
    
  })

  it('should render Image for photo', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={{}} alt='fake alt text' className='modalImage' />)).toBe(true)
  })

  it('should render Thumbnail for photo', () => {
    expect(enzymeWrapper.containsMatchingElement(<Image cfImage={{}} alt='fake alt text' className='modalThumbnail' />)).toBe(true)
  })

  it('should render Title for modal', () => {
    expect(enzymeWrapper.containsMatchingElement(<div>fake title</div>)).toBe(true)
  })
  
  it('should render ReactModal for modal', () => {
    expect(enzymeWrapper.find(ReactModal).exists()
  )})
})
