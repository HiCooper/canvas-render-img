import axios from 'axios'
import { Message } from 'element-ui'
import { getRequestId, updateRequestId } from '@/utils/auth'

// api的base_url
// axios.defaults.baseURL = process.env.VUE_APP_API_ROOT
axios.defaults.baseURL = window.serverConfig.serverAddress
// request timeout
axios.defaults.timeout = 5000

// request interceptor
axios.interceptors.request.use(config => {
  config.headers['X-Token'] = 'token'
  // 这里发送每个请求 都会带上 requestId ， 在有响应时 会更新 requestId， 因为：后端将会对 一定时间内 所有接口请求频次有限制
  config.headers.requestId = getRequestId()
  return config
}, error => {
  console.error(error)
  return Promise.reject(error)
})

// respone interceptor
axios.interceptors.response.use(response => {
  updateRequestId()
  if (response.data.size) {
    return response
  }
  const { code, msg } = response.data
  if (code && code !== '200' && msg !== 'SUCCESS') {
    // 统一提示 业务异常响应
    if (code !== '401') {
      // 非401 异常统一提示
      Message.error(msg)
    }
    return Promise.reject(response.data)
  }
  return response
}, (error) => {
  const { response } = error
  if (!response) {
    Message({
      message: '系统连接超时',
      type: 'error',
      duration: 5 * 1000
    })
  } else {
    const {
      status,
      statusText
    } = response
    Message({
      message: `${status}, ${statusText}`,
      type: 'error',
      duration: 5 * 1000
    })
  }
  return Promise.reject(error)
})

export default axios
