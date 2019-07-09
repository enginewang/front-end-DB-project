/* eslint-disable */
import {UserLayout, BasicLayout, RouteView, BlankLayout, PageView} from '@/layouts'
import {bxAnaalyse} from '@/core/icons'
import {addAccessoryInWarehouse} from '@/api/accessory'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {title: '首页'},
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        name: 'homepage',
        meta: {title: '个人中心', keepAlive: true, icon: 'user'},
        component: () => import( '@/views/user/Homepage' ),
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
            component: () => import( '@/views/warehouse/WarehousePreview' ),
            meta: {
              title: '预览', keepAlive: false, icon: 'search'
            }
          },
          {
            path: '/warehouse/detail/:id',
            name: 'Detail',
            hidden: true,
            component: () => import( '@/views/warehouse/WarehouseDetail' ),
            meta: {
              title: '详细', keepAlive: false
            }
          },
          {
            path: '/warehouse/map',
            name: 'Map',
            component: () => import( '@/views/warehouse/Map' ),
            meta: {title: '地图', keepAlive: false, icon: 'picture'}
          }
        ]
      },
      // equipment
      {
        path: '/equipment',
        name: 'equipment',
        redirect: '/equipment/preview',
        meta: {title: '器材', keepAlive: true, icon: 'sliders'},
        component: RouteView,
        children: [
          {
            path: '/equipment/preview',
            name: 'EquipPreview',
            component: () => import( '@/views/equipment/EquipmentPreview' ),
            meta: {
              title: '仓储器材', keepAlive: false, icon: 'database'
            }
          },
          {
            path: '/equipment/using:pageNo([1-9]\\d*)?',
            name: 'EquipUsing',
            component: () => import( '@/views/equipment/EquipmentUsing' ),
            meta: {
              title: '在用器材', keepAlive: false, icon: 'api'
            }
          },
          {
            path: '/equipment/detail/:id',
            name: 'EquipDetail',
            hidden: true,
            component: () => import( '@/views/equipment/EquipInfo' ),
            meta: {
              title: '器材详情', keepAlive: false, icon: 'bars'
            },
          },
        ]
      },
      // accessory
      {
        path: '/accessory',
        name: 'accessory',
        meta: {title: '配件', keepAlive: true, icon: 'tool'},
        component: RouteView,
        children: [
          {
            path: '/accessory/Accessory',
            name: addAccessoryInWarehouse,
            component: () => import( '@/views/accessory/Accessory' ),
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
        meta: {title: '各类表单', keepAlive: true, icon: "table"},
        children: [
          {
            path: '/sheets/workSheet',
            name: 'workSheet',
            component: () => import( '@/views/sheets/workSheet' ),
            meta: {title: '工单', keepAlive: false, icon: 'snippets'}
          },
          {
            path: '/sheets/repairSheet',
            name: 'repairSheet',
            component: () => import( '@/views/sheets/repairSheet' ),
            meta: {title: '报修单', keepAlive: false, icon: 'exception'}
          },
          {
            path: '/sheets/checkSheet',
            name: 'checkSheet',
            component: () => import( '@/views/sheets/checkSheet' ),
            meta: {title: '巡检单', keepAlive: false, icon: 'copy'}
          },
        ]
      },

      // staff
      {
        path: '/staff',
        name: 'staff',
        redirect: '/staff/staffManage',
        component: RouteView,
        meta: {title: '员工', keepAlive: true, icon: "team", permission: ['super']},
        children: [
          {
            path: '/staff/staffManage',
            name: 'staffManage',
            component: () => import( '@/views/staff/staffManage' ),
            meta: {title: '员工管理', keepAlive: false, icon: 'check-circle', permission: ['super']}
          }
        ]
      },
      {
        path: '/server',
        name: 'server',
        redirect: '/server/KibanaMonitor',
        component: RouteView,
        meta: {title: '服务器', keepAlive: true, icon: bxAnaalyse, permission: ['super']},
        children: [
          {
            path: '/server/KibanaMonitor',
            name: 'KibanaMonitor',
            component: () => import( '@/views/server/KibanaMonitor' ),
            meta: {title: '监控', keepAlive: false, icon: 'video-camera', permission: ['super']}
          },
        ]
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: {title: '个人页', icon: 'user', keepAlive: true, permission: ['user']},
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import( '@/views/account/center/Index' ),
            meta: {title: '个人中心', keepAlive: true, permission: ['user']}
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import( '@/views/account/settings/Index' ),
            meta: {title: '个人设置', hideHeader: true, permission: ['user']},
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import( '@/views/account/settings/BaseSetting' ),
                meta: {title: '基本设置', hidden: true, permission: ['user']}
              },
              {
                path: '/account/settings/security',
                name: 'SecuritySettings',
                component: () => import( '@/views/account/settings/Security' ),
                meta: {title: '安全设置', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import( '@/views/account/settings/Custom' ),
                meta: {title: '个性化设置', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: '/account/settings/binding',
                name: 'BindingSettings',
                component: () => import( '@/views/account/settings/Binding' ),
                meta: {title: '账户绑定', hidden: true, keepAlive: true, permission: ['user']}
              },
              {
                path: '/account/settings/notification',
                name: 'NotificationSettings',
                component: () => import( '@/views/account/settings/Notification' ),
                meta: {title: '新消息通知', hidden: true, keepAlive: true, permission: ['user']}
              }
            ]
          }
        ]
      },
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
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login' )
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
        component: () => import( '@/views/Home' )
      }
    ]
  },

  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404' )
  }

]
