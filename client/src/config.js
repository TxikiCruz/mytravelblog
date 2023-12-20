
const URL = window.location.hostname === `localhost`
  ? `https://localhost:3040`
  : `https://172.16.5.4:5173`

export { URL }