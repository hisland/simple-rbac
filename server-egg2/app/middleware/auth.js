module.exports = ({ key }) => {
  return async function gzip(ctx, next) {
    if (await ctx.service.user.hasPermission(ctx.session.login.userId, key)) {
      await next()
    } else {
      ctx.throw(422, '没有权限')
    }
  }
}
