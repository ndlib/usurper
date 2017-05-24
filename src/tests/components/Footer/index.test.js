import React from 'react'
import { shallow } from 'enzyme'
import Footer from '../../../components/Footer'
import FooterInfo from '../../../components/Footer/FooterInfo'
import FooterLinks from '../../../components/Footer/FooterLinks'

let enzymeWrapper = shallow(<Footer />)

describe('components/Footer/index.js', () => {
  it('Renders a FooterInfo component', () => {
    expect(enzymeWrapper.containsMatchingElement(<FooterInfo />)).toBe(true)
  })

  it('Renders a FooterLinks component', () => {
    expect(enzymeWrapper.containsMatchingElement(<FooterLinks />)).toBe(true)
  })
})
