import * as actions from '../../actions/hours'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import Config from '../../shared/Configuration'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockPageResponse = {
    'hesburghlibrary':{'name':'Hesburgh Libraries Service Points','today':{'date':'2017-05-08','display':'Open All Day','opens':'00:00','closes':'23:59'},'thisWeek':{'rows':[{'fromDay':'Sunday','toDay':'Friday','display':'Open All Day','rowDisplay':'Sunday - Friday'},{'fromDay':'Saturday','toDay':null,'display':'9am - 11pm'}],'display':'May 7th - 13th','dates':['2017-05-07','2017-05-08','2017-05-09','2017-05-10','2017-05-11','2017-05-12','2017-05-13']},'upcomingDifferentHours':{'rows':[{'fromDay':'Sunday','toDay':null,'display':'10am - 11pm','rowDisplay':'Sunday'},{'fromDay':'Monday','toDay':'Friday','display':'7am - 11pm','rowDisplay':'Monday - Friday'},{'fromDay':'Saturday','toDay':null,'display':'9am - 11pm'}],'display':'May 14th - 20th','dates':['2017-05-14','2017-05-15','2017-05-16','2017-05-17','2017-05-18','2017-05-19','2017-05-20']}},
    'circulationservices':{'name':'Circulation Services','today':{'date':'2017-05-08','display':'Opens at 8am','opens':'08:00','closes':'00:00'},'thisWeek':{'rows':[{'fromDay':'Sunday','toDay':null,'display':'Opens at 12pm','rowDisplay':'Sunday'},{'fromDay':'Monday','toDay':'Thursday','display':'Opens at 8am','rowDisplay':'Monday - Thursday'},{'fromDay':'Friday','toDay':null,'display':'8am - 6pm','rowDisplay':'Friday'},{'fromDay':'Saturday','toDay':null,'display':'12pm - 5pm'}],'display':'May 7th - 13th','dates':['2017-05-07','2017-05-08','2017-05-09','2017-05-10','2017-05-11','2017-05-12','2017-05-13']},'upcomingDifferentHours':{'rows':[{'fromDay':'Sunday','toDay':null,'display':'Closed','rowDisplay':'Sunday'},{'fromDay':'Monday','toDay':null,'display':'8am - 5pm','rowDisplay':'Monday'},{'fromDay':'Tuesday','toDay':null,'display':'8pm - 5pm','rowDisplay':'Tuesday'},{'fromDay':'Wednesday','toDay':'Friday','display':'8am - 5pm','rowDisplay':'Wednesday - Friday'},{'fromDay':'Saturday','toDay':null,'display':'12pm - 5pm'}],'display':'May 14th - 20th','dates':['2017-05-14','2017-05-15','2017-05-16','2017-05-17','2017-05-18','2017-05-19','2017-05-20']}}
}

const extractHostname = (url) => {
  return url.match(/http[s]?:\/\/.*[.]com/)[0]
}

describe('hours requestHours action creator', () => {
  it('should create a HOURS_REQUEST action for the requested hours', () => {
    const expectedAction = {
      type: actions.HOURS_REQUEST,
    }

    expect(actions.requestHours()).toEqual(expectedAction)
  })
})

describe('hours fetchHours async action creator', () => {
  it('should first create a HOURS_REQUEST action for the requested page', () => {
    nock(Config.hoursAPIURL)
      .get('/hours')
      .reply(200, mockPageResponse)

    const expectedAction = {
      type: actions.HOURS_REQUEST,
    }

    const store = mockStore({ })
    return store.dispatch(actions.fetchHours())
      .then(() => {
        expect(store.getActions()[0]).toMatchObject(expectedAction)
      })
  })

  describe('Data Requests', () => {
    beforeEach(() => {
      nock(Config.hoursAPIURL)
        .get('/hours')
        .reply(200, mockPageResponse)
    })
    afterEach(() => {
      nock.cleanAll()
    })

    it('should create a HOURS_RECEIVE action for the content returned ', () => {
      const expectedAction = {
        type: actions.HOURS_RECEIVE,
        status: 'API_STATUS_SUCCESS',
        hours: mockPageResponse,
      }

      const store = mockStore({ })
      return store.dispatch(actions.fetchHours())
        .then(() => {
          expect(store.getActions()[1]).toMatchObject(expectedAction)
        })
    })
  })
})
