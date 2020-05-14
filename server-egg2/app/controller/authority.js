'use strict'

const BaseCRUDController = require('./baseCRUD.js')

module.exports = class extends BaseCRUDController {
  constructor(ctx) {
    super(ctx)
    this.serviceName = 'authority'
    this.modelName = 'Authority'
  }
}
