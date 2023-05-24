import axios from 'axios'

const appClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents(perPage, page) {
    return appClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(eventId) {
    return appClient.get(`/events/${eventId}`)
  },
}
