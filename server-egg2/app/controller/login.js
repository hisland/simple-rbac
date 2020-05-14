'use strict'

const { Controller } = require('egg')

module.exports = class extends Controller {
  async login() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params, cookie, session } = ctx
    const { query, querys, body, files } = ctx.request

    const { username, password } = query
    if (!username) ctx.throw(400, '请输入用户名')
    if (!password) ctx.throw(400, '请输入密码')

    const user = await model.User.findOne({ username })
    if (!user) ctx.throw(400, '用户不存在')
    if (user.error_times >= 3) ctx.throw(400, '用户已锁定, 请联系管理员解锁')

    if (user.password === password) {
      session.login = {
        userId: user._id,
        username,
        login_at: new Date(),
      }
      ctx.body = {
        code: 0,
        result: '登录成功',
      }
    } else {
      user.error_times++
      await user.save()
      ctx.throw(400, '用户密码错误')
    }
  }
  async logout() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params, cookie, session } = ctx
    const { query, querys, body, files } = ctx.request

    ctx.session = null

    ctx.body = {
      code: 0,
      result: '退出成功',
    }
  }
}
