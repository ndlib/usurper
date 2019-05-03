// COinS - Context Objects in Spans: https://web.archive.org/web/20170424223448/http://ocoins.info/
// An antiquated specification for bibliographic info that reference management software still relies on.
// Info on COinS is few and far between, but it's closely related to OpenURL 1.0.

import React from 'react'
import PropTypes from 'prop-types'

const staticValues = [
  { key: 'url_ver', value: 'Z39.88-2004' },
  { key: 'url_ctx_fmt', value: 'info:ofi/fmt:kev:mtx:ctx' },
  { key: 'ctx_ver', value: 'Z39.88-2004' },
  { key: 'ctx_enc', value: 'info:ofi/enc:UTF-8' },
  { key: 'rfr_id', value: 'info:sid/library.nd.edu' },
]

const bookFields = (props) => {
  return [
    { key: 'rft_val_fmt', value: 'info:ofi/fmt:kev:mtx:book' },
    { key: 'rft.btitle', value: props.title },
    { key: 'rft.edition', value: props.edition },
    { key: 'rft.pub', value: props.published },
  ]
}

const journalFields = (props) => {
  return [
    { key: 'rft_val_fmt', value: 'info:ofi/fmt:kev:mtx:journal' },
    { key: 'rft.atitle', value: props.title },
    { key: 'rft.jtitle', value: props.journalTitle },
    { key: 'rft.volume', value: props.volume },
  ]
}

const CoinsObject = (props) => {
  const docNumber = (props.itemNumber || props.docNumber)
  const parts = [
    { ...staticValues },
    { key: 'rft_id', value: 'info:ofi/nam:http:onesearch.library.nd.edu/NDU:malc_blended:ndu_aleph' + docNumber },
    { key: 'rft_id', value: props.isbn ? 'info:ofi/nam:urn:ISBN:' + props.isbn : null },
    { key: 'rft_id', value: props.issn ? 'info:ofi/nam:urn:ISSN:' + props.issn : null },
    { key: 'rft.au', value: props.author },
    { key: 'rft.date', value: props.publicationDate },
    { key: 'rft.isbn', value: props.isbn },
    { key: 'rft.issn', value: props.issn },
  ]
  if (props.documentType === 'BOOK') {
    parts.push(...bookFields(props))
  } else {
    parts.push(...journalFields(props))
  }

  // Format a big string of key=value&key2=value2... etc. Excludes any part with a falsy value.
  const title = parts.filter(e => e.value)
    .map(e => e.value ? e.key + '=' + encodeURIComponent(e.value) : null).join('&')

  return (
    <span className='Z3988' title={title} />
  )
}

CoinsObject.propTypes = {
  documentType: PropTypes.string.isRequired,
  author: PropTypes.string,
  itemNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  docNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isbn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  issn: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  publicationDate: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.number,
  ]),
}

bookFields.propTypes = {
  title: PropTypes.string,
  edition: PropTypes.string,
  published: PropTypes.string,
}

journalFields.propTypes = {
  title: PropTypes.string,
  journalTitle: PropTypes.string,
  volume: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default CoinsObject
