import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import customer from '@/components/customer/customer'
import login from '@/components/customer/login'
import register from '@/components/customer/register'
import alter from '@/components/customer/alter'
import cancle from '@/components/customer/cancle'
import commonBottom from '@/components/customer/commonBottom'

import manage from '@/components/management/manage'
import main from '@/components/management/main'
import table from '@/components/management/table'
import select from '@/components/management/select'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: login,
      redirect:'/customer/login'
    },{
      path:'/customer',
      component:customer,
      children:[
        {
          path:'/customer/login',
          component:login
        },{
          path:'/customer/register',
          component:register
        },{
          path:'/customer/alter',
          component:alter
        },{
          path:'/customer/cancle',
          component:cancle
        }
      ]
    },{
      path:'/manage',
      component:manage,
      children:[
        {
          path:'/manage/main',
          component:main
        },{
          path:'/manage/table',
          component:table
        },{
          path:'/manage/select',
          component:select
        }
      ]
    }
  ],
  //	mode : "history"	// 去掉地址栏的#号
})
