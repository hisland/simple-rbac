module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema, ObjectId } = mongoose

  const SchemaDef = new Schema({
    name: { type: String, required: [true, '必须指定角色名'], default: '' },
    code: { type: String, default: '' },
    remark: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    defaultRole: { type: Boolean, default: false },
  })

  const name = 'role'
  return(conn || mongoose).model(name, SchemaDef, name)
}
