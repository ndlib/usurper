import typy from 'typy'
import * as helper from 'constants/HelperFunctions'

export const mapFacet = (facet) => {
  const fieldName = typy(facet, 'fields.extraData.associatedField').safeString
  const facetKey = typy(facet, 'fields.extraData.key').safeString || fieldName
  const textOptions = typy(facet, 'fields.textItems').safeArray.map((opt) => ({
    key: opt,
    value: opt,
  }))
  const referenceOptions = typy(facet, 'fields.items').safeArray.map((ref) => {
    const contentType = typy(ref, 'sys.contentType.sys.id').safeString
    switch (contentType) {
      case 'internalLink':
        return {
          key: ref.fields.id,
          value: (typy(ref, 'fields.usePageTitle').safeBoolean && typy(ref, 'fields.page').isObject)
            ? typy(ref, 'fields.page.fields.title').safeString
            : typy(ref, 'fields.title').safeString,
        }
      case 'externalLink':
        return {
          key: ref.sys.id,
          value: ref.fields.title,
        }
      case 'building':
      case 'dynamicPage':
      case 'exhibit':
      case 'floor':
      case 'news':
      case 'servicePoint':
      case 'space':
        return {
          key: ref.fields.slug,
          value: ref.fields.title,
        }
      case 'page':
        return {
          key: ref.fields.slug,
          value: ref.fields.alternateTitle,
        }
      case 'person':
        return {
          key: ref.fields.name,
          value: ref.fields.name,
        }
      case 'alert':
      case 'presenter':
        return {
          key: ref.fields.title,
          value: ref.fields.title,
        }
      case 'resource':
        return {
          key: ref.fields.alephSystemNumber,
          value: ref.fields.title,
        }
      default:
        console.warn(`Unsupported content type ${contentType} for facet!`)
        return null
    }
  }).filter(mapped => mapped) // filter out nulls

  return {
    id: facet.fields.id,
    label: facet.fields.displayName,
    key: facetKey,
    fieldName: fieldName,
    options: helper.sortList(textOptions.concat(referenceOptions), 'value', 'asc'),
  }
}
