module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema, ObjectId } = mongoose

  const SchemaDef = new Schema({
    username: { type: String, required: [true, '必须设置用户名'], default: '' },
    password: { type: String, required: [true, '必须设置密码'], default: '' },
    code: { type: String, default: '' },
    realname: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    remark: { type: String, default: '' },
    error_times: { type: Number, default: 0 },
  })

  const name = 'user'
  return(conn || mongoose).model(name, SchemaDef, name)
}
