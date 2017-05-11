import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

const personURL = Config.personAPI + '/person'

function handlePerson (dispatch, data) {
  if (data.person && data.person.entries.length > 0) {
    var person = data.person
    if (person.entries.length > 1) {
      console.log('got more than one person for this netid??')
    }
    person = person.entries[0]
    dispatch(
      states.recievePersonal(
        'person',
        statuses.SUCCESS,
        person
      )
    )
  }
}

export default function getPerson () {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(states.requestPersonal('person'))
    states.startRequest(
      personURL,
      dispatch,
      handlePerson,
      state.login.token,
      (e) => {
        dispatch(states.recievePersonal('person', statuses.ERROR))
      }
    )
  }
}
