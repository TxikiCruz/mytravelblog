// group array by field
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    )
    return result
  }, {})
}

// validation for size files
export const checkFileSize = (file) => {
  const maxAllowedSize = 5 * 1024 * 1024
  return file.size < maxAllowedSize
}
