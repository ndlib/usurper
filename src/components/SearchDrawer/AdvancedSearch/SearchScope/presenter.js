import React from 'react'

const SearchScope = (props) => {
  if (props.searchType === 'NDCATALOG') {
    return (
      <div>
        <label htmlFor='exlidSearchIn'>Search Scope:</label>
        <select id='scopesListAdvanced' name='scp.scps' onChange={props.onChange}>
          <option value='scope%3A%28hathi_pub%29,scope%3A%28ndulawrestricted%29,scope%3A%28dtlrestricted%29,scope%3A%28NDU%29,scope%3A%28NDLAW%29,scope%3A%28ndu_digitool%29'>All Notre Dame Campus Libraries</option>
          <option value='scope%3A%28NDU%29,scope%3A%28BCI%29,scope%3A%28HCC%29,scope%3A%28SMC%29,scope%3A%28NDLAW%29,scope%3A%28&quot;MALC&quot;%29'>ND and Partner Libraries</option>
          <option value='scope%3A%28dtlrestricted%29,scope%3A%28NDU%29,scope%3A%28ndu_digitool%29,scope%3A%28&quot;MALC&quot;%29'>Hesburgh Libraries &amp; Branches</option>
          <option value='scope%3A%28RARE%29,scope%3A%28MRARE%29,scope%3A%28SPEC%29'>Special Collections</option>
          <option value='scope%3A%28MEDIN%29'>Medieval Institute</option>
          <option value='scope%3A%28REF%29'>Hesburgh Reference</option>
          <option value='scope%3A%28NDLAW%29'>Kresge Law Library</option>
          <option value='scope%3A%28BIC%29'>Business Library</option>
          <option value='scope%3A%28ARCHT%29'>Architecture Library</option>
          <option value='scope%3A%28CHEMP%29'>Chemistry Physics Library</option>
          <option value='scope%3A%28ENGIN%29' >Engineering Library</option>
          <option value='scope%3A%28KELLO%29'>Kellogg/Kroc Information Center</option>
          <option value='scope%3A%28MATH%29'>Mathematics Library</option>
          <option value='scope%3A%28CSLC%29'>Center for the Study of Languages &amp; Culture</option>
          <option value='scope%3A%28RADLB%29'>Radiation Laboratory</option>
        </select>
      </div>
    )
  }
  return null
}

export default SearchScope
