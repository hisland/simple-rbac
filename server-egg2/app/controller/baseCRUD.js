'use strict'

const { Controller } = require('egg')

module.exports = class extends Controller {
  async getListAll() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    const list = await service[serviceName].getListAll()
    ctx.body = {
      code: 0,
      result: list,
    }
  }

  async getListPage() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }
  async getTreeAll() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }
  async getTreeLazy() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }

  async getNewOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    const one = await service[serviceName].getNewOne()
    ctx.body = {
      code: 0,
      result: one,
    }
  }
  async getOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.validate({ id: { type: 'string', required: true } }, params)
    const gotOne = await service[serviceName].getById(params.id)
    ctx.body = {
      code: 0,
      result: gotOne,
    }
  }
  async getMany() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }

  async createOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    delete body._id
    const item = new model[modelName](body)
    const err = item.validateSync()
    if (err) {
      ctx.throw(422, service.util.mongooseErrorMsg(err.errors))
    } else {
      const savedOne = await service[serviceName].createOne(item)
      ctx.body = {
        code: 0,
        result: savedOne,
      }
    }
  }
  async createMany() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }

  async updateOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    const item = new model[modelName](body)
    const err = item.validateSync()
    if (err) {
      ctx.throw(422, err.message)
    } else {
      const newOne = await service[serviceName].updateOne(item)
      ctx.body = {
        code: 0,
        result: newOne,
      }
    }
  }
  async updateMany() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }

  async replaceOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    const item = new model[modelName](body)
    const err = item.validateSync()
    if (err) {
      ctx.throw(422, err.message)
    } else {
      const newOne = await service[serviceName].replaceOne(body)
      ctx.body = {
        code: 0,
        result: newOne,
      }
    }
  }
  async replaceMany() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }

  async delOne() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    const delOne = await service[serviceName].delOne(params.id)
    if (delOne) {
      ctx.body = {
        code: 0,
        result: delOne,
      }
    } else {
      ctx.throw(500, '已经不存在了')
    }
  }
  async delMany() {
    const { ctx, serviceName, modelName } = this
    const { model, service, params } = ctx
    const { query, querys, body, files } = ctx.request
    ctx.throw(500, '未实现')
  }
}
