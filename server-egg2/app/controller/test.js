'use strict'

const { Controller } = require('egg')

module.exports = class extends Controller {
  async modelKeys() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.body = {
      code: 0,
      result: Object.keys(model),
    }
  }
}
