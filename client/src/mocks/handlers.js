import { http, HttpResponse } from 'msw'
import { URL } from '../config'

export const handlers = [
  http.get(`${URL}/admin/categories`, async () => {
    return HttpResponse.json()
  })
]
