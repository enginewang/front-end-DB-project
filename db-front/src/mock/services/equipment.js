import Mock from 'mockjs2'
import { builder, getQueryParameters } from '../util'

const equipmentUsing = () => {
  return builder([{
    id: 1,
    type: '哑铃',
    damage: '0.9',

  },
    {
      id: 2,
      name: '程序员日常',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png'
    },
    {
      id: 1,
      name: '设计天团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png'
    },
    {
      id: 1,
      name: '中二少女团',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png'
    },
    {
      id: 1,
      name: '骗你学计算机',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png'
    }
  ])
}

Mock.mock(/\/equipment\/using/, 'get', equipmentUsing())
