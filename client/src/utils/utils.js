import axios from 'axios'

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

// Get countries by continent from public api
export const getCountries = async (str) => {
  axios
    .get(`https://restcountries.com/v3.1/region/${str}`)
    .then((res) => {
      // let tempCont = []
      // for (let ele of res.data) {
      //   tempCont.push(ele.name.common)
      // }
      return res.data
    })
    .catch((err) => console.log(err))
}

export const goBackBrowser = () => {
  window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0)
  })
}
