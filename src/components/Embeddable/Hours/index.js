import React from 'react'
import ServiceNowLink from '../../Interactive/ServiceNowLink'

const EmbeddableHours = () => {
  return (
    <div>
      Looking for hours information? Woops!
      Please <ServiceNowLink isWebContent>submit a ticket</ServiceNowLink> to let us know it is missing.
    </div>
  )
}

export default EmbeddableHours
