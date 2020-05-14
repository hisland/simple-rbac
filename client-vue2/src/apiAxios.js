import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(
  function(response) {
    const { status, data } = response
    if (data.errors) {
      showError1(data.errors)
      return Promise.reject({ response })
    } else {
      return response
    }
  },
  function(error) {
    const { response } = error
    const { status, data } = response
    if (status === 500) {
      showError1(data.errors)
      return Promise.reject(error)
    } else {
      if (data.errors) {
        showError1(data.errors)
      } else {
        showError2(data.message)
      }
      return Promise.reject(error)
    }
  }
)

export default axios

function showError1(errors) {
  Vue.prototype.$Message.error({
    render(h) {
      return h(
        'div',
        errors.map(error => h('div', error.message))
      )
    },
    duration: 4,
    closable: true,
  })
}
function showError2(message) {
  const msgs = message.split('\n')
  Vue.prototype.$Message.error({
    render(h) {
      return h(
        'div',
        msgs.map(msg => h('div', { style: 'text-align:left' }, msg))
      )
    },
    duration: 4,
    closable: true,
  })
}
