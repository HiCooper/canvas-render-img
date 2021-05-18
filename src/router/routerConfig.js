
// 布局组件
import BlankLayout from '@/layout/BlankLayout'
import HeaderLayout from '@/layout/HeaderLayout'
import Home from '@/views/Home'

const routerConfig = [
  {
    path: '/',
    name: 'home',
    layout: BlankLayout,
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    layout: HeaderLayout,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  }
]

export default routerConfig
