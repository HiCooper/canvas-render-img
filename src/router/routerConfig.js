// 布局组件
import BlankLayout from '@/layout/BlankLayout'

const routerConfig = [
  {
    path: '/',
    name: 'home',
    layout: BlankLayout,
    component: () => import('../views/Home.vue')
  }
]

export default routerConfig
