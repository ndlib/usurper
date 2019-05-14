import React from 'react'
import { shallow } from 'enzyme'

import Actions, { hasActions } from 'components/Account/ResourceList/Resource/Actions/presenter'
import ExportButton from 'components/Account/ResourceList/ListActions/ExportButton'
import DeleteButton from 'components/Account/ResourceList/ListActions/DeleteButton'
import Link from 'components/Interactive/Link'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'

import typeConstants from 'components/Account/ResourceList/constants'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Actions {...props} />)
}

describe('components/Account/ResourceList/Resource/Actions/presenter.js', () => {
  const commonProps = {
    onRenewClick: jest.fn(),
    renewal: {
      test: {
        state: statuses.SUCCESS,
        data: {
          renewStatus: 200,
        },
      },
    },
    canRenew: true,
    illWebUrl: 'link.to/illWeb',
    illViewUrl: 'link.to/illView',
    listType: 'borrowed',
  }

  afterEach(() => {
    enzymeWrapper = undefined
    jest.resetAllMocks()
  })

  describe('any item', () => {
    it('should render export and delete buttons correctly for each listType', () => {
      const renderedAtLeastOnce = {
        export: false,
        delete: false,
      }

      Object.keys(typeConstants).forEach((listType) => {
        props = {
          ...commonProps,
          item: {
            barcode: 'foo',
          },
          listType: listType,
        }
        enzymeWrapper = setup(props)

        let find = <ExportButton items={[props.item]} />
        let expected = typeConstants[props.listType].exportButton
        expect(enzymeWrapper.containsMatchingElement(find)).toEqual(expected)
        renderedAtLeastOnce.export = renderedAtLeastOnce.export || expected
        if (expected) {
          expect(hasActions(props.item, props.listType)).toBe(true)
        }

        find = <DeleteButton items={[props.item]} />
        expected = typeConstants[props.listType].deleteButton
        expect(enzymeWrapper.containsMatchingElement(find)).toEqual(expected)
        renderedAtLeastOnce.delete = renderedAtLeastOnce.delete || expected
        if (expected) {
          expect(hasActions(props.item, props.listType)).toBe(true)
        }
      })

      // We can't be confident the test worked if none of the options are configured to render a given button
      expect(renderedAtLeastOnce).toEqual({
        export: true,
        delete: true,
      })
    })
  })

  describe('with item on loan', () => {
    describe('before renewing', () => {
      beforeEach(() => {
        props = {
          ...commonProps,
          item: {
            transactionNumber: '12BuckleMyShoe',
            barcode: 'test',
            status: 'On Loan',
          },
        }
        enzymeWrapper = setup(props)
      })

      it('should not render loading', () => {
        expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
      })

      it('should show renew button', () => {
        expect(enzymeWrapper.containsMatchingElement(<button>Renew</button>)).toBe(true)
      })

      it('should have actions', () => {
        expect(hasActions(props.item, props.listType)).toBe(true)
      })
    })

    describe('after renewing', () => {
      beforeEach(() => {
        props = {
          ...commonProps,
          item: {
            transactionNumber: '12BuckleMyShoe',
            barcode: 'test',
            status: 'On Loan',
          },
          renewMessage: 'Successfully renewed, dawg',
        }
        enzymeWrapper = setup(props)
      })

      it('should not render loading', () => {
        expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
      })

      it('should show renew message', () => {
        const find = <UpdateStatus status={statuses.SUCCESS} text={props.renewMessage} />
        expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
        expect(enzymeWrapper.find(UpdateStatus)).toHaveLength(1)
      })

      it('should not show renew button', () => {
        expect(enzymeWrapper.containsMatchingElement(<button>Renew</button>)).toBe(false)
      })

      it('should have actions', () => {
        expect(hasActions(props.item, props.listType)).toBe(true)
      })
    })

    describe('while loading', () => {
      beforeEach(() => {
        props = {
          ...commonProps,
          item: {
            transactionNumber: '12BuckleMyShoe',
            barcode: 'testing',
            status: 'On Loan',
          },
          renewal: {
            testing: {
              state: statuses.FETCHING,
            },
          },
        }
        enzymeWrapper = setup(props)
      })

      it('should render loading', () => {
        expect(enzymeWrapper.find(InlineLoading).exists()).toBe(true)
      })

      it('should not show renew button', () => {
        expect(enzymeWrapper.containsMatchingElement(<button>Renew</button>)).toBe(false)
      })

      it('should have actions', () => {
        expect(hasActions(props.item, props.listType)).toBe(true)
      })
    })
  })

  describe('with item delivered to web', () => {
    beforeEach(() => {
      props = {
        ...commonProps,
        item: {
          transactionNumber: 'itsApsychobillyFreakout',
          barcode: 'fbzgp',
          status: 'Delivered to Web',
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should display link to web view', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={props.illWebUrl}>{expect.any(String)}</Link>)).toBe(true)
    })

    it('should display link to view in ILL', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={props.illViewUrl}>{expect.any(String)}</Link>)).toBe(true)
    })

    it('should not display loading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })

    it('should not display renew button', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>Renew</button>)).toBe(false)
    })

    it('should have actions', () => {
      expect(hasActions(props.item, props.listType)).toBe(true)
    })
  })

  describe('with no transactionNumber', () => {
    beforeEach(() => {
      props = {
        ...commonProps,
        item: {
          barcode: 'fbzgp',
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should not display link to web view', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={props.illWebUrl}>{expect.any(String)}</Link>)).toBe(false)
    })

    it('should not display link to view in ILL', () => {
      expect(enzymeWrapper.containsMatchingElement(<Link to={props.illViewUrl}>{expect.any(String)}</Link>)).toBe(false)
    })

    it('should not display loading', () => {
      expect(enzymeWrapper.find(InlineLoading).exists()).toBe(false)
    })

    it('should not display renew button', () => {
      expect(enzymeWrapper.containsMatchingElement(<button>Renew</button>)).toBe(false)
    })

    it('should have no actions', () => {
      expect(hasActions(props.item, props.listType)).toBe(false)
    })
  })
})
