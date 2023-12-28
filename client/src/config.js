//import axios from "axios"

const URL = window.location.hostname === `localhost`
  ? `http://localhost:3040`
  : `http://144.126.206.220`

// const customInstance = axios.create({
//   baseURL: URL,
//   headers: {'Accept': 'aplication/json'}
// })

//export default customInstance
export { URL }