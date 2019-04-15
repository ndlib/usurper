import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../../../../components/Layout/Footer'
import FooterInfo from '../../../../components/Layout/Footer/FooterInfo'
import FooterLinks from '../../../../components/Layout/Footer/FooterLinks'

let enzymeWrapper = shallow(<Footer />)

describe('components/Layout/Footer/index.js', () => {
  it('Renders a FooterInfo component', () => {
    expect(enzymeWrapper.containsMatchingElement(<FooterInfo />)).toBe(true)
  })

  it('Renders a FooterLinks component', () => {
    expect(enzymeWrapper.containsMatchingElement(<FooterLinks />)).toBe(true)
  })
})
