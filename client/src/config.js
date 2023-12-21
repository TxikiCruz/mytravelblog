
const URL = window.location.hostname === `localhost`
  ? `http://localhost:3040`
  : `https://172.16.5.4:5173`

export { URL }