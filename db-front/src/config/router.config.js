/* eslint-disable */
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse, codeAPI, chat } from '@/core/icons'
import { addAccessoryInWarehouse } from '@/api/accessory'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        meta: { title: '个人中心', keepAlive: true, icon: 'user' },
        component: () => import('@/views/user/Homepage'),
      },
      // warehouse
      {
        path: '/warehouse',
        name: 'warehouse',
        redirect: '/warehouse/preview',
        component: RouteView,
        meta: {
          title: '仓库', keepAlive: true, icon: 'home'
        },
        children: [
          {
            path: '/warehouse/preview',
            name: 'Preview',
            component: () => import('@/views/warehouse/WarehousePreview'),
            meta: {
              title: '预览', keepAlive: false, icon: 'search'
            }
          },
          {
            path: '/warehouse/detail/:id',
            name: 'Detail',
            hidden: true,
            component: () => import('@/views/warehouse/WarehouseDetail'),
            meta: {
              title: '详细', keepAlive: false
            }
          },
        ]
      },
      // equipment
      {
        path: '/equipment',
        name: 'equipment',
        redirect: '/equipment/preview',
        meta: { title: '器材', keepAlive: true, icon: 'sliders' },
        component: RouteView,
        children: [
          {
            path: '/equipment/preview',
            name: 'EquipPreview',
            component: () => import('@/views/equipment/EquipmentPreview'),
            meta: {
              title: '仓储器材', keepAlive: false, icon: 'database'
            }
          },
          {
            path: '/equipment/using:pageNo([1-9]\\d*)?',
            name: 'EquipUsing',
            component: () => import('@/views/equipment/EquipmentUsing'),
            meta: {
              title: '在用器材', keepAlive: false, icon: 'api'
            }
          },
          {
            path: '/equipment/detail/:id',
            name: 'EquipDetail',
            hidden: true,
            component: () => import('@/views/equipment/EquipInfo'),
            meta: {
              title: '器材详情', keepAlive: false, icon: 'bars'
            },
          },
          {
            path: '/warehouse/map',
            name: 'Map',
            component: () => import('@/views/warehouse/Map'),
            meta: { title: '地图', keepAlive: false, icon: 'picture' }
          },
        ]
      },
      // accessory
      {
        path: '/accessory',
        name: 'accessory',
        meta: { title: '配件', keepAlive: true, icon: 'tool' },
        component: RouteView,
        children: [
          {
            path: '/accessory/Accessory',
            name: 'AccessoryInWarehouse',
            component: () => import('@/views/accessory/Accessory'),
            meta: {
              title: '配件管理', keepAlive: false, icon: 'bars'
            }
          }
        ]
      },
      // sheets
      {
        path: '/sheets',
        name: 'sheets',
        redirect: '/sheets/workSheet',
        component: RouteView,
        meta: { title: '表单', keepAlive: true, icon: "table" },
        children: [
          {
            path: '/sheets/repairSheet',
            name: 'repairSheet',
            component: () => import('@/views/sheets/repairSheet'),
            meta: { title: '报修单', keepAlive: false, icon: 'exception' }
          },
          {
            path: '/sheets/checkSheet',
            name: 'checkSheet',
            component: () => import('@/views/sheets/checkSheet'),
            meta: { title: '巡检单', keepAlive: false, icon: 'copy' }
          },
          {
            path: '/sheets/workSheet',
            name: 'workSheet',
            component: () => import('@/views/sheets/workSheet'),
            meta: { title: '工单', keepAlive: false, icon: 'snippets' }
          },
          {
            path: '/sheets/components/:details',
            name: 'repairDetail',
            hidden: true,
            component: () => import('@/views/sheets/components/repairSheetDetail'),
            meta: {
              title: '报修单详情', keepAlive: false, icon: 'bars'
            },
          },
        ]
      },

      // staff
      {
        path: '/staff',
        name: 'staff',
        redirect: '/staff/staffManage',
        component: RouteView,
        meta: { title: '员工', keepAlive: true, icon: "team", permission: ['super'] },
        children: [
          {
            path: '/staff/staffManage',
            name: 'staffManage',
            component: () => import('@/views/staff/staffManage'),
            meta: { title: '员工管理', keepAlive: false, icon: 'check-circle', permission: ['super'] }
          }
        ]
      },
      {
        path: '/server',
        name: 'server',
        redirect: '/server/KibanaMonitor',
        hidden:'true',
        component: RouteView,
        meta: { title: '服务器', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/server/KibanaMonitor',
            name: 'KibanaMonitor',
            component: () => import('@/views/server/KibanaMonitor'),
            meta: { title: '监控', keepAlive: false, icon: bxAnaalyse }
          },
          {
            path: '/server/Swagger',
            name: 'Swagger',
            component: () => import('@/views/server/Swagger'),
            meta: { title: 'API', keepAlive: false, icon: codeAPI }
          },
        ]
      },
      {
        path: '/chat',
        name: 'chat',
        hidden:'true',
        component: () => import('@/views/chat/Rocket'),
        meta: { title: '聊天', keepAlive: true, icon: chat },
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('@/views/Home')
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
