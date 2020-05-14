module.exports = (options) => {
  return async function (ctx, next) {
    if (ctx.session.login) {
      await next()
    } else {
      ctx.throw(401, '请登录后操作')
    }
  }
}
