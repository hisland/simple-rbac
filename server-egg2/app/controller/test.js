'use strict'

const { Controller } = require('egg')

module.exports = class extends Controller {
  async modelKeys() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params, cookie, session } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.body = {
      code: 0,
      result: Object.keys(model),
    }
  }
  async cookieSession() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params, cookie, session } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.body = {
      code: 0,
      result: {
        cookie: cookie ? Object.keys(cookie) : null,
        session: session ? Object.keys(session) : null,
      },
    }
  }
}
