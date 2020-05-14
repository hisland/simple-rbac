'use strict'

// 禁用自带 static 插件, 不提供静态文件服务, 由 nginx 提供
// exports.static = false

// 禁用自带 session 插件, 因为 微信小程序 不支持 cookie-session
// exports.session = false

exports.mongoose = {
  enable: true,
  package: 'egg-mongoose',
}

// exports.redis = {
//   enable: true,
//   package: 'egg-redis',
// }

exports.graphql = {
  enable: true,
  package: 'egg-graphql',
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
}
