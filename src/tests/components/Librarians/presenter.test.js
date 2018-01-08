import React from 'react'
import * as statuses from '../../../constants/APIStatuses'
import Librarians from '../../../components/Librarians/presenter'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import Contact from '../../../components/Contact'
import Image from '../../../components/Image'

let enzymeWrapper
const setup = (props) => {
  enzymeWrapper = shallow(<Librarians {...props} />)
}

const librarian = (name, phone, email, photo) => {
  return {
    name: name,
    phone: phone,
    email: email,
    photo: photo,
  }
}

describe('components/Librarians/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('on success', () => {
    beforeEach(() => {
      setup({
        librarianInfo: {
          status: statuses.SUCCESS,
          json: {
            librarians: [
              librarian('foo_user', '555.555.5555', 'foo@nd.edu'),
              librarian('bar_user', '444.444.4444', 'bar@nd.edu', 'bar.jpg'),
            ],
          },
        },
      })
    })

    it('should render all librarian contact info', () => {
      let contactElement = <Contact name='foo_user' phone='555.555.5555' email='foo@nd.edu' />
      expect(enzymeWrapper.containsMatchingElement(contactElement)).toBe(true)
      contactElement = <Contact name='bar_user' phone='444.444.4444' email='bar@nd.edu' />
      expect(enzymeWrapper.containsMatchingElement(contactElement)).toBe(true)
    })

    it('should render the librarian photo', () => {
      expect(enzymeWrapper.containsMatchingElement(<Image src='bar.jpg' />)).toBe(true)
    })
  })

  describe('while fetching', () => {
    beforeEach(() => {
      setup({
        librarianInfo: {
          status: statuses.FETCHING,
        },
      })
    })

    it('should render a loading message', () => {
      expect(enzymeWrapper.findWhere(n => n.text().includes('Loading')).exists()).toBe(true)
    })
  })

  describe('when not found', () => {
    beforeEach(() => {
      setup({
        librarianInfo: {
          status: statuses.NOT_FOUND,
        },
      })
    })

    it('should render null', () => {
      expect(enzymeWrapper.equals(null)).toBe(true)
    })
  })

  describe('on Error', () => {
    beforeEach(() => {
      setup({
        librarianInfo: {
          status: statuses.ERROR,
        },
      })
    })

    it('should render nothing', () => {
      expect(enzymeWrapper.instance()).toBe(null)
    })
  })
})
