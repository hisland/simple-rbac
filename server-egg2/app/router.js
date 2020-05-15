'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router } = app
  router.prefix('/api')

  const { auth } = app.middleware
  const needLogin = app.middleware.needLogin({})

  const { controller } = app
  const { test } = controller
  router.get('/test/model_keys', test.modelKeys)
  router.get('/test/cookie_session', test.cookieSession)

  const { login } = controller
  router.get('/login', login.login)
  router.get('/logout', needLogin, login.logout)
  const { captcha } = controller
  router.get('/captcha', captcha.captcha)

  const { user } = controller
  router.get('/user-list-all', user.getListAll)
  // router.get('/user-one-:id', user.getOne)
  // router.post('/user-one', user.createOne)
  // router.patch('/user-one', user.updateOne)
  // router.delete('/user-one-:id', user.delOne)
}
