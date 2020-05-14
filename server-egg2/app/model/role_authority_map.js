module.exports = (app, conn) => {
  const { mongoose } = app
  const { Schema } = mongoose
  const { ObjectId } = Schema.Types

  const SchemaDef = new Schema({
    role_id: { type: ObjectId, required: true },
    authority_id: { type: ObjectId, required: true },
  })
  const name = 'role_authority_map'

  return (conn || mongoose).model(name, SchemaDef, name)
}
