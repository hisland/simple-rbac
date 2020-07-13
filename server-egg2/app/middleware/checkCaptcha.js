module.exports = () => {
  return async function checkCaptcha(ctx, next) {
    if (ctx.request.query.captcha === ctx.session.captcha) {
      await next()
    } else {
      ctx.throw(400, '验证码不正确', { code: 400 })
    }
  }
}
