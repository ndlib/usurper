import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Tags from '../Tags'

const FacetTags = ({ entry, facets, includeFilter, excludeFilter, onTagClick }) => {
  // Filter down which facets to include depending on props
  const filteredFacets = typy(facets).safeArray
    .filter(facet => !includeFilter || includeFilter.includes(facet.key))
    .filter(facet => !excludeFilter || !excludeFilter.includes(facet.key))

  // Loop through facets and options, adding a tag for each value the entry has that matches a facet + option combo
  const matches = filteredFacets.map(facet => {
    // In order to support fields which might be an array of references, we need to split on the "associatedField" path
    // and look at the child properties of each object in the array.
    const deepMap = (fields, path) => {
      // Splits into 2 groups with delimiter "[]." or "[*]." Ex: subjects[].fields -> [subjects, fields]
      const splitPath = path.split(/(.+?)(?:$|\[\*?\]\.)(.*)/)
      const stepResult = typy(fields, splitPath[1])
      // If we captured a group 2 from the regex that means we found the delimiter and need to keep digging deeper
      if (splitPath[2]) {
        let allResults = []
        stepResult.safeArray.forEach(nestedRecord => {
          const nestedResult = deepMap(nestedRecord, splitPath[2])
          if (nestedResult.isArray) {
            allResults = allResults.concat(nestedResult)
          } else {
            allResults.push(nestedResult)
          }
        })
        return allResults
      } else {
        return stepResult.isArray ? stepResult.safeArray : stepResult.safeString
      }
    }

    const fieldTypy = typy(deepMap(entry.fields || entry, facet.fieldName))
    const options = (fieldTypy.isArray)
      ? facet.options.filter(opt => fieldTypy.safeArray.includes(opt.key))
      : facet.options.filter(opt => opt.key === fieldTypy.safeString)

    return options.map(option => ({
      ...option,
      onClick: (tag) => onTagClick(facet.key, [ tag.key ]),
    }))
  })

  return <Tags groups={matches} />
}

FacetTags.propTypes = {
  entry: PropTypes.object.isRequired,
  facets: PropTypes.array.isRequired,
  includeFilter: PropTypes.array, // keys of specific facets to include (allow list)
  excludeFilter: PropTypes.array, // keys of specific facets to exclude (deny list)
  onTagClick: PropTypes.func,
}

export default FacetTags
