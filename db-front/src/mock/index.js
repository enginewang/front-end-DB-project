import Mock from 'mockjs2'

// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
  // 使用同步加载依赖
  // 防止 vuex 中的 GetInfo 早于 mock 运行，导致无法 mock 请求返回结果
<<<<<<< Updated upstream
  console.log('mock mounting')
  require('./services/auth')
  require('./services/user')
  require('./services/manage')
  require('./services/other')
  require('./services/tagCloud')
  require('./services/article')
  require('./services/warehouse')
  require('./services/sheets')
  require('./services/equipment')
  require('./services/accessory')
=======
  console.log( 'mock mounting' )
  require( './services/auth' )
  require( './services/user' )
  require( './services/manage' )
  require( './services/other' )
  require( './services/tagCloud' )
  require( './services/article' )
  require( './services/warehouse' )
  require( './services/sheets' )
  require( './services/equipment' )
  require( './services/staff' )
  require( './services/accessory' )
  require( './services/repairSheet')
>>>>>>> Stashed changes

  Mock.setup({
    timeout: 800 // setter delay time
  })
  console.log('mock mounted')
}
