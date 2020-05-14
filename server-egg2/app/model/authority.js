module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema } = mongoose
  const { ObjectId } = Schema.Types

  const SchemaDef = new Schema({
    key: { type: String, required: [true, '必须设置权限key'] },
    remark: { type: String },
  })
  const name = 'authority'

  return (conn || mongoose).model(name, SchemaDef, name)
}
