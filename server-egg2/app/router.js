'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router } = app
  router.prefix('/api')
  const { controller } = app

  const { auth } = app.middleware
  const { checkCaptcha } = app.middleware

  const { test } = controller
  router.get('/test/model_keys', test.modelKeys)
  router.get('/test/cookie_session', test.cookieSession)

  const { captcha } = controller
  router.get('/captcha', captcha.captcha)

  const { login } = controller
  router.get('/login', checkCaptcha, login.login)
  router.get('/logout', login.logout)

  const { user } = controller
  router.get('/user-list-all', user.getListAll)
  // router.get('/user-one-:id', user.getOne)
  // router.post('/user-one', user.createOne)
  // router.patch('/user-one', user.updateOne)
  // router.delete('/user-one-:id', user.delOne)
}
