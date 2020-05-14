'use strict'

const BaseCRUDService = require('./baseCRUD.js')

const { Types } = require('mongoose')
const { ObjectId } = Types

module.exports = class extends BaseCRUDService {
  constructor(ctx) {
    super(ctx)
    this.modelName = 'User'
  }
  async getRoles(userId) {
    const { ctx, modelName } = this
    const { model, service } = ctx

    const list1 = await model.UserRoleMap.find({ user_id: userId })
    const list2 = await model.Role.find({
      _id: {
        $in: list1.map((vv) => vv.role_id),
      },
    })
    return list2
  }
  async hasPermission(userId, permKey) {
    const { ctx, modelName } = this
    const { model, service } = ctx

    const perm = await model.Authority.findOne({ key: permKey })
    const list1 = await model.UserRoleMap.find({ user_id: userId })

    const has = await model.RoleAuthorityMap.exists({
      role_id: {
        $in: list1.map((vv) => vv.role_id),
      },
      authority_id: perm._id,
    })
    return has
  }
}
