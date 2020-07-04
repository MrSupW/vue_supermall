import  Vue from 'vue'
import VueRouter from "vue-router"

const Home =  ()=> import('../views/home/home')
const Cart =  ()=> import('../views/cart/cart')
const Category =  ()=> import('../views/category/category')
const Profile =  ()=> import('../views/profile/profile')
const Detail = ()=> import('../views/detail/detail')

Vue.use(VueRouter)
const routes = [
  {
    name:'default',
    path:'',
    redirect: '/home'
  },
  {
    name:'主页',
    path: '/home',
    component: Home
  },
    {
    name:'购物车',
    path: '/cart',
    component: Cart
  },
    {
    name:'个人中心',
    path: '/profile',
    component: Profile
  },
  {
    name:'分类',
    path: '/category',
    component: Category
  },
  {
    name: '详情页',
    path: '/detail/:iid',
    component: Detail
  },
]


const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next)=>{
  document.title = to.matched[0].name
  next()
})

export default router


