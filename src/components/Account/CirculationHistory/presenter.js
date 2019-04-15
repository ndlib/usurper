import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../PageTitle'
import ResourceList from '../LoanResources/ResourceList'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import UserMenu from '../../Navigation/UserMenu'
import Link from '../../Link'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import Config from '../../../shared/Configuration'

const OptedOutMessage = () => {
  const illiadUrl = Config.illiadBaseURL.replace('<<form>>', 60).replace('<<value>>', '')
  const primoUrl = `${Config.onesearchBaseURL}/primo-explore/account?vid=NDU&section=loans`

  return (
    <div>
      <span>You must <Link to='/settings'>opt-in to save full checkout history</Link>.</span>
      <br /><br />
      <span><em>
        Please note that the Libraries always retain a limited history up to 30 days after return date.
        You can view your saved history in OneSearch, <Link to={primoUrl}>here</Link>. Go to the Loans tab in your
        account and change the dropdown to "30 Day Loan History".
        <br /><br />
        Interlibrary Loan records cannot be purged.
        You can view your ILL history in ILLiad, <Link to={illiadUrl}>here</Link>.
      </em></span>
    </div>
  )
}

const CirculationHistory = (props) => {
  const history = props.resources.have

  return (
    <div className='content'>
      <SearchProgramaticSet open={false} />
      <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Checkout History' />} />
      <PageTitle title='Checkout History' hideInPage />

      <div className='row'>
        <div className='col-xs-12 col-md-8'>
          <div key='CirculationHistory' className='resources-list'>
            <h3>{ `${history.items.length} Item${(history.items.length !== 1 ? 's' : '')} in Checkout History` }</h3>
            { props.optedIn || history.loading
              ? (
                <ResourceList
                  list={history.items}
                  emptyText={history.emptyText}
                  loading={history.loading}
                  alephId={props.alephId}
                  renewal={props.renewal}
                  borrowed
                  listType='Checkout History'
                  deleteFromHistory
                  historical
                />
              )
              : OptedOutMessage()
            }
          </div>
        </div>
        <StaticSidebar slug='checkout-history' preview={props.preview} />
      </div>
    </div>
  )
}

CirculationHistory.propTypes = {
  resources: PropTypes.object,
  renewal: PropTypes.object,
  alephId: PropTypes.string,
  optedIn: PropTypes.bool,
  preview: PropTypes.bool,
}

export default CirculationHistory
