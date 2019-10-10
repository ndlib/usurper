

module.exports = (pre, stage, post, data) => {
  let key = (pre ? pre + '-' : '') + stage + (post ? '-' + post : '')

  for(let i = 0; i < data.length; i++) {
    if (data[i].Name == key) {
      return data[i].Value
    }
  }

  throw `${key} is not found in the cloudformation exports for stage "${stage}"`
}
