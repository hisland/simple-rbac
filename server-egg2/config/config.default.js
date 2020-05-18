/* eslint valid-jsdoc: "off" */

'use strict'

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1577952026593_7733'

  config.cluster = {
    listen: {
      port: 9722,
    },
  }

  config.security = {
    csrf: false, // TODO 用 curl 暂时关闭,
    // domainWhiteList: [
    //   'http://192.168.3.118:8080',
    //   'http://192.168.3.178:8080',
    //   'http://192.168.3.230:8080',
    //   'http://localhost:8080',
    // ],
  }

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/simple-rbac',
      options: {
        useFindAndModify: false,
        useUnifiedTopology: true,
      },
    },
  }

  config.multipart = {
    mode: 'file',
    whitelist: ['.png', '.jpg', '.jpeg'],
    fileSize: 1024 * 1024 * 5,
  }

  config.graphql = {
    router: '/api/graphql',
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
    // 是否加载开发者工具 graphiql, 默认开启。路由同 router 字段。使用浏览器打开该可见。
    graphiql: true,
    //是否设置默认的Query和Mutation, 默认关闭
    defaultEmptySchema: true,
    // graphQL 路由前的拦截器
    onPreGraphQL: function* (ctx) {},
    // 开发工具 graphiQL 路由前的拦截器，建议用于做权限操作(如只提供开发者使用)
    onPreGraphiQL: function* (ctx) {},
    // apollo server的透传参数，参考[文档](https://www.apollographql.com/docs/apollo-server/api/apollo-server/#parameters)
    // apolloServerOptions: {
    //   rootValue,
    //   formatError,
    //   formatResponse,
    //   mocks,
    //   schemaDirectives,
    //   introspection,
    //   playground,
    //   debug,
    //   validationRules,
    //   tracing,
    //   cacheControl,
    //   subscriptions,
    //   engine,
    //   persistedQueries,
    //   cors,
    // },
  }

  // add your middleware config here
  config.middleware = ['needLogin', 'graphql']
  config.needLogin = {
    ignore: [
      /^\/api\/login$/, //
      /^\/api\/captcha$/,
      /^\/api\/test/,
    ],
  }

  return config
}
