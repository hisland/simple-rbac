module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema } = mongoose
  const { ObjectId } = Schema.Types

  const SchemaDef = new Schema({
    username: { type: String, required: [true, '必须设置用户名'] },
    password: { type: String, required: [true, '必须设置密码'] },
    code: { type: String },
    realname: { type: String },
    disabled: { type: Boolean },
    remark: { type: String },
    error_times: { type: Number, default: 0 },
  })
  const name = 'user'

  return (conn || mongoose).model(name, SchemaDef, name)
}
