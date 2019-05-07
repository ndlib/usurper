import React from 'react'
import { shallow } from 'enzyme'

import FromIcon from 'components/Account/ResourceList/Resource/FromIcon'

import nduIcon from 'static/images/icons/ND_monogram.svg'
import hccIcon from 'static/images/icons/HCC.svg'
import illIcon from 'static/images/icons/ILL.svg'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<FromIcon {...props} />)
}

describe('components/Account/ResourceList/Resource/FromIcon', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should render HCC icon when provided HCC', () => {
    enzymeWrapper = setup({ code: 'HCC' })
    expect(enzymeWrapper.containsMatchingElement(<img src={hccIcon}></img>)).toBe(true)
  })

  it('should render ILL icon when provided ILL', () => {
    enzymeWrapper = setup({ code: 'ILL' })
    expect(enzymeWrapper.containsMatchingElement(<img src={illIcon}></img>)).toBe(true)
  })

  it('should render NDU icon when provided NDU', () => {
    enzymeWrapper = setup({ code: 'NDU' })
    expect(enzymeWrapper.containsMatchingElement(<img src={nduIcon}></img>)).toBe(true)
  })

  it('should default to NDU when invalid code provided', () => {
    enzymeWrapper = setup({ code: 'FHBFPAUGBocxv0eytat - my best friend :)' })
    expect(enzymeWrapper.containsMatchingElement(<img src={nduIcon}></img>)).toBe(true)
  })

  it('should default to NDU when no code provided', () => {
    enzymeWrapper = setup()
    expect(enzymeWrapper.containsMatchingElement(<img src={nduIcon}></img>)).toBe(true)
  })
})
