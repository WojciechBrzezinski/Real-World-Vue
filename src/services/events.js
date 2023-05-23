import axios from 'axios'

const appClient = axios.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getEvents() {
    return appClient.get('db/events.json')
  }
}
