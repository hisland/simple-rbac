'use strict'

const BaseCRUDService = require('./baseCRUD.js')

const { Types } = require('mongoose')
const { ObjectId } = Types

module.exports = class extends BaseCRUDService {
  constructor(ctx) {
    super(ctx)
    this.modelName = 'Role'
  }
}
