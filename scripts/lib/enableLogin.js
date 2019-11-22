module.exports = () => {
  const data = process.argv[3]
  if (data === '--disableLogin') {
    return false
  }
  return true
}
