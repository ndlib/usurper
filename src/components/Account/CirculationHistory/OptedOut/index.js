import React from 'react'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

const OptedOut = () => {
  const illiadUrl = Config.illiadBaseURL.replace('<<form>>', 60).replace('<<value>>', '')
  const primoUrl = `${Config.onesearchBaseURL}/primo-explore/account?vid=NDU&section=loans`
  const settingsUrl = '/settings'

  return (
    <div>
      <span>You must <Link to={settingsUrl}>opt-in to save full checkout history</Link>.</span>
      <br /><br />
      <span>
        <em>
          Please note that the Libraries always retain a limited history up to 30 days after return date.
          You can view your saved history in <Link to={primoUrl}>OneSearch</Link>. Go to the Loans tab in your
          account and change the dropdown to "30 Day Loan History".
          <br /><br />
          Interlibrary Loan records cannot be purged.
          You can view your ILL history in <Link to={illiadUrl}>ILLiad</Link>.
        </em>
      </span>
    </div>
  )
}

export default OptedOut
