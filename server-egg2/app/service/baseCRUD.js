'use strict'

const { Service } = require('egg')

module.exports = class extends Service {
  async getListAll() {
    const { ctx, modelName } = this
    const { model, service } = ctx

    const list = await model[modelName].find()
    return list
  }
  async getListPage({ page = 0 } = {}) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async getTreeAll() {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }
  async getTreeLazy() {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async getNewOne() {
    const { ctx, modelName } = this
    const { model, service } = ctx
    const one = new model[modelName]()
    one._id = null
    return one
  }

  async getById(id) {
    const { ctx, modelName } = this
    const { model, service } = ctx
    const findFilter = { _id: id }
    const one = await model[modelName].findOne(findFilter)
    return one
  }
  async getOne(id) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }
  async getMany(idList) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async createOne(item) {
    const { ctx, modelName } = this
    const { model, service } = ctx

    const savedOne = await model[modelName].create(item)
    return savedOne
  }
  async createMany(itemList) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async updateOne(delta) {
    const { ctx, modelName } = this
    const { model, service } = ctx

    const rsOne = await model[modelName].findOneAndUpdate(
      { _id: delta.id },
      delta,
      { new: true }
    )
    return rsOne
  }
  async updateMany(deltaList) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async replaceOne(delta) {
    const { ctx, modelName } = this
    const { model, service } = ctx
    const rsOne = await model[modelName].findOneAndReplace(
      { _id: delta.id },
      delta
    )
    return rsOne
  }
  async replaceMany(itemList) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }

  async delOne(id) {
    const { ctx, modelName } = this
    const { model, service } = ctx
    const rsOne = await model[modelName].findByIdAndDelete(id)
    return rsOne
  }
  async delMany(idList) {
    const { ctx, modelName } = this
    const { model, service } = ctx
  }
}
