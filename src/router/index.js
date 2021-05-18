import Vue from 'vue'
import VueRouter from 'vue-router'
import routerConfig from './routerConfig'

Vue.use(VueRouter)

const routerMap = []

const recursiveRouterConfig = (config = []) => {
  config.forEach((item) => {
    const route = {
      path: item.path,
      component: item.layout,
      children: [
        {
          path: '',
          component: item.component
        }
      ]
    }
    if (Array.isArray(item.children)) {
      recursiveRouterConfig(item.children)
    }
    routerMap.push(route)
  })
  return routerMap
}

const routes = recursiveRouterConfig(routerConfig)
console.log(routes)

export default new VueRouter({ routes })
