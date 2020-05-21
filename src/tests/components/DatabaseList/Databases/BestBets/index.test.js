import React from 'react'
import { shallow } from 'enzyme'
import BestBets from 'components/DatabaseList/Databases/BestBets'
import SubjectSection from 'components/DatabaseList/Databases/BestBets/SubjectSection'

const setup = (props) => {
  return shallow(<BestBets {...props} />)
}

let enzymeWrapper
let props

describe('components/DatabaseList/Databases/BestBets', () => {
  beforeEach(() => {
    props = {
      databases: [
        {
          sys: {
            id: 'many test',
          },
          fields: {
            subjects: [],
          },
        },
        {
          sys: {
            id: 'very id',
          },
          fields: {
            subjects: [
              {
                sys: {
                  id: 'sys_doge',
                },
                fields: {
                  id: 'doge',
                },
              },
            ],
            bestBets: [
              {
                sys: {
                  id: 'sys_doge',
                },
                fields: {
                  id: 'doge',
                },
              },
            ],
          },
        },
        {
          sys: {
            id: 'much wow',
          },
          fields: {
            subjects: [
              {
                sys: {
                  id: 'sys_woof',
                },
                fields: {
                  id: 'woof',
                },
              },
            ],
          },
        },
      ],
      subjects: [
        {
          sys: {
            id: 'sys_doge',
          },
          fields: {
            id: 'doge',
          },
          linkText: 'Doge',
        },
        {
          sys: {
            id: 'sys_woof',
          },
          fields: {
            id: 'woof',
          },
          linkText: 'Woof',
        },
        {
          sys: {
            id: 'sys_notMeow',
          },
          fields: {
            fields: 'notMeow',
          },
          linkText: 'Not a Meow',
        },
        {
          sys: {
            id: 'sys_bark',
          },
          fields: {
            id: 'bark',
          },
          linkText: 'Bark',
        },
      ],
      subjectFilter: ['doge', 'woof', 'notMeow'],
      onSubjectFilterApply: jest.fn(),
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render a SubjectSection for each subject with best bets', () => {
    const expectedResults = {
      'Doge': true,
      'Woof': false,
      'Not a Meow': false,
      'Bark': false,
    }
    Object.keys(expectedResults).forEach(subjectName => {
      expect(enzymeWrapper.findWhere(el => el.type() === SubjectSection && el.props().subjectName === subjectName).exists()).toBe(expectedResults[subjectName])
    })
  })

  describe('with no best bets', () => {
    beforeEach(() => {
      props = {
        ...props,
        subjectFilter: ['woof', 'notMeow'],
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})
