export const filterAndSort = (list, filterFields, filterValue, sortValue, sortDir) => {
  const value = filterValue.toLowerCase()

  const sortOps = {
    asc: (a, b) => {
      if (!a && b) {
        return -1
      } else if (!b && a) {
        return 1
      } else if (!a && !b) {
        return 0
      }
      return -a.localeCompare(b, undefined, { sensitivity: 'accent', ignorePunctuation: true })
    },
    desc: (a, b) => {
      if (!a && b) {
        return 1
      } else if (!b && a) {
        return -1
      } else if (!a && !b) {
        return 0
      }
      return a.localeCompare(b, undefined, { sensitivity: 'accent', ignorePunctuation: true })
    },
  }

  return list.filter((item) => {
    let inFilter = false
    if (!filterFields || !filterFields.length) {
      inFilter = !value
    } else {
      if (!Array.isArray(filterFields)) {
        filterFields = [ filterFields ]
      }
      filterFields.forEach((field) => {
        inFilter = inFilter || (item[field] && item[field].toLowerCase().indexOf(value) >= 0)
      })
    }
    return inFilter
  }).sort((a, b) => {
    let aValue = a[sortValue]
    let bValue = b[sortValue]

    if (aValue === bValue) {
      return sortOps['desc'](a['title'], b['title'])
    }

    return sortOps[sortDir](aValue, bValue)
  })
}
