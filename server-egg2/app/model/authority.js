module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema, ObjectId } = mongoose

  const SchemaDef = new Schema({
    key: { type: String, required: [true, '必须设置权限key'], default: null },
    remark: { type: String, default: '' },
  })

  const name = 'authority'
  return (conn || mongoose).model(name, SchemaDef, name)
}
