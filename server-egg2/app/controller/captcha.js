'use strict'

const { Controller } = require('egg')
const svgCaptcha = require('svg-captcha')

module.exports = class extends Controller {
  async captcha() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params, cookie, session } = ctx
    const { query, querys, body, files } = ctx.request

    const captcha = svgCaptcha.create({ ignoreChars: '0o1il' })
    ctx.set('Content-Type', 'image/svg+xml')
    session.captcha = captcha.text
    ctx.body = captcha.data
  }
}
