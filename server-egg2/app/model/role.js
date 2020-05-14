module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema } = mongoose
  const { ObjectId } = Schema.Types

  const SchemaDef = new Schema({
    name: { type: String, required: [true, '必须指定角色名'] },
    code: { type: String },
    remark: { type: String },
    disabled: { type: Boolean },
    defaultRole: { type: Boolean },
  })
  const name = 'role'

  return (conn || mongoose).model(name, SchemaDef, name)
}
