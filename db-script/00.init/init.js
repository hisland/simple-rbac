const _ = require('lodash')
const mongoose = require('mongoose')
const moment = require('moment')
const request = require('request')
const fs = require('fs')
const path = require('path')
mongoose.Promise = Promise
const app = { mongoose }

const conn_new = mongoose.createConnection('mongodb://127.0.0.1/simple-rbac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const conn_old = mongoose.createConnection('mongodb://127.0.0.1/simple-rbac', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

function GetModel(model) {
  return require('../../server-egg2/app/model/' + model)
}
const new_user = GetModel('user.js')(app, conn_new)
const new_role = GetModel('role.js')(app, conn_new)
const new_authority = GetModel('authority.js')(app, conn_new)
const new_role_authority_map = GetModel('role_authority_map.js')(app, conn_new)
const new_user_role_map = GetModel('user_role_map.js')(app, conn_new)

;(async function () {
  console.log('1. delete all')
  await new_user.deleteMany({})
  await new_role.deleteMany({})
  await new_authority.deleteMany({})
  await new_role_authority_map.deleteMany({})
  await new_user_role_map.deleteMany({})
  console.log('1. delete all done')

  console.log('2. init some')
  const user1 = await new_user.create({
    username: 'aa',
    password: 'bb',
  })
  const role1 = await new_role.create({
    name: 'superadmin',
    remark: '超级管理员',
  })
  await new_user_role_map.create({
    user_id: user1._id,
    role_id: role1._id,
  })

  const auth1 = await new_authority.create({
    key: 'home_index',
    remark: 'home_index',
  })
  await new_role_authority_map.create({
    role_id: role1._id,
    authority_id: auth1._id,
  })
  console.log('2. init some done')

  await mongoose.disconnect()
})()
